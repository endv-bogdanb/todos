import { type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { Form } from "@/components";
import { type queryTodo } from "@/http";

const Schema = Type.Object({
  description: Type.String({ minLength: 1 }),
  rank: Type.Union([Type.Literal("low"), Type.Literal("high")]),
  title: Type.String({ minLength: 1 }),
});

export type TodosFormProps =
  | {
      initialValues?: never;
      mutationKey: readonly string[];
      onSubmit: (value: Static<typeof Schema>) => void;
    }
  | {
      initialValues: Awaited<ReturnType<typeof queryTodo>> | null;
      mutationKey: readonly string[];
      onSubmit: (value: Awaited<ReturnType<typeof queryTodo>>) => void;
    };

export const TodosForm: FC<TodosFormProps> = ({
  onSubmit: submit,
  initialValues,
  mutationKey,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Static<typeof Schema>>({
    defaultValues: {
      rank: "low",
      ...initialValues,
    },
    resolver: typeboxResolver(Schema),
  });

  const onSubmit = useCallback(
    (value: unknown) => {
      submit(value as Awaited<ReturnType<typeof queryTodo>>);
    },
    [submit],
  );

  return (
    <Form
      mutationKey={mutationKey}
      setError={setError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>
          {t("todoForm.title")}
          <input {...register("title")} />
        </label>
        <div>
          {errors.title ? <span>{errors.title.message ?? ""} </span> : null}
        </div>
      </div>
      <div>
        <label>
          {t("todoForm.description")}
          <input {...register("description")} />
        </label>
        <div>
          {errors.description ? (
            <span>{errors.description.message ?? ""} </span>
          ) : null}
        </div>
      </div>
      <div>
        <fieldset>
          <legend>{t("todoForm.rank.title")}</legend>
          <label>
            {t("todoForm.rank.low")}
            <input type="radio" {...register("rank")} value="low" />
          </label>
          <label>
            {t("todoForm.rank.high")}
            <input type="radio" {...register("rank")} value="high" />
          </label>
        </fieldset>
        <div>
          {errors.rank ? <span>{errors.rank.message ?? ""} </span> : null}
        </div>
      </div>
      <footer>
        <button type="submit">
          {initialValues ? t("todoForm.edit") : t("todoForm.create")}
        </button>
      </footer>
    </Form>
  );
};
