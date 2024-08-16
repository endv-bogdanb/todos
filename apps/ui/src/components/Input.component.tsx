import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

export interface InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Required<
      Omit<
        UseControllerProps<TFieldValues, TName>,
        "rules" | "shouldUnregister" | "disabled"
      >
    >,
    Pick<
      UseControllerProps<TFieldValues, TName>,
      "shouldUnregister" | "disabled"
    >,
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "name" | "defaultValue" | "disabled"
    > {
  label: string;
}

export const Input = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName>,
) => {
  const {
    control,
    name,
    label,
    defaultValue,
    disabled = false,
    shouldUnregister = false,
    ...rest
  } = props;

  const { field, fieldState } = useController({
    control,
    defaultValue,
    disabled,
    name,
    shouldUnregister,
  });

  return (
    <label>
      {label}
      <input
        ref={field.ref}
        name={name}
        value={field.value}
        disabled={field.disabled}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...rest}
      />
      <span>{fieldState.invalid && fieldState.error?.message}</span>
    </label>
  );
};
