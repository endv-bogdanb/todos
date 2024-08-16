import { type FormEvent, type ReactNode, useEffect } from "react";
import { type FieldValues, type UseFormSetError } from "react-hook-form";
import { useMutationState } from "@tanstack/react-query";
import { ValidationError } from "@/utils";

export interface FormProps<TFieldValues extends FieldValues> {
  children: ReactNode;
  mutationKey: readonly string[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<unknown>;
  setError: UseFormSetError<TFieldValues>;
}

export const Form = <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues>,
) => {
  const { onSubmit, setError, mutationKey, children } = props;

  const errors = useMutationState({
    filters: { exact: true, mutationKey, status: "error" },
    select: (mutation) => {
      return mutation.state.error;
    },
  });

  useEffect(() => {
    const LAST_INDEX = -1;
    const error = errors.at(LAST_INDEX);

    if (ValidationError.is(error)) {
      error.toFormErrors<TFieldValues>((path, message) => {
        setError(path, { message });
      });
    }
  }, [errors, setError]);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <form onSubmit={onSubmit}>{children}</form>;
};
