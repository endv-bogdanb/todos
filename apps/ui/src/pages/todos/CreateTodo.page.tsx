import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, queryTodos } from "../../http/todos";

const Schema = Type.Object({
  description: Type.String({
    errorMessage: "Title cannot be empty",
    minLength: 1,
  }),
  rank: Type.Union([Type.Literal("low"), Type.Literal("high")]),
  title: Type.String({
    errorMessage: "Title cannot be empty",
    minLength: 1,
  }),
});

export const CreateTodoPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Static<typeof Schema>>({
    defaultValues: {
      rank: "low",
    },
    // @ts-expect-error Somethings wrong with typing in typeboxResolver
    resolver: typeboxResolver(Schema),
  });

  const { mutate } = useMutation({
    mutationFn: createTodo,
    mutationKey: createTodo.mutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryTodos.queryKey });
      // eslint-disable-next-line no-magic-numbers
      navigate(-1);
    },
  });

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((values) => {
        mutate(values);
      })}
    >
      <div>
        <label>
          Title
          <input {...register("title")} />
        </label>
        <div>
          {errors.title ? <span>{errors.title.message ?? ""} </span> : null}
        </div>
      </div>
      <div>
        <label>
          Description
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
          <legend>Rank</legend>
          <label>
            Low
            <input type="radio" {...register("rank")} value="low" />
          </label>
          <label>
            High
            <input type="radio" {...register("rank")} value="high" />
          </label>
        </fieldset>
        <div>
          {errors.rank ? <span>{errors.rank.message ?? ""} </span> : null}
        </div>
      </div>
      <footer>
        <button type="submit">submit</button>
      </footer>
    </form>
  );
};
