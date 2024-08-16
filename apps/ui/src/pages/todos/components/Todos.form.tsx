import { type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { Form, Input, Radio, RadioGroup } from "@/components";
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
  const { handleSubmit, control, setError } = useForm<Static<typeof Schema>>({
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
        <Input
          control={control}
          name="title"
          label={t("todoForm.title")}
          defaultValue={""}
        />
      </div>
      <div>
        <Input
          control={control}
          name="description"
          label={t("todoForm.description")}
          defaultValue={""}
        />
      </div>
      <div>
        <RadioGroup
          control={control}
          label={t("todoForm.rank.title")}
          name={"rank"}
          defaultValue={"low"}
        >
          <Radio
            control={control}
            label={t("todoForm.rank.low")}
            name={"rank"}
            value="low"
          />
          <Radio
            control={control}
            label={t("todoForm.rank.high")}
            name={"rank"}
            value="high"
          />
        </RadioGroup>
      </div>
      <footer>
        <button type="submit">
          {initialValues ? t("todoForm.edit") : t("todoForm.create")}
        </button>
      </footer>
    </Form>
  );
};
