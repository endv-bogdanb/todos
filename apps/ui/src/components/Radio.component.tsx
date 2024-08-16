import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

export interface RadioProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Required<
      Omit<
        UseControllerProps<TFieldValues, TName>,
        "rules" | "shouldUnregister" | "disabled" | "defaultValue"
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
      "name" | "defaultValue" | "disabled" | "type"
    > {
  label: string;
}

export const Radio = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: RadioProps<TFieldValues, TName>,
) => {
  const {
    control,
    name,
    label,
    disabled = false,
    shouldUnregister = false,
    ...rest
  } = props;

  const { field } = useController({
    control,
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
        disabled={field.disabled}
        onChange={field.onChange}
        onBlur={field.onBlur}
        type="radio"
        checked={field.value === rest.value}
        {...rest}
      />
    </label>
  );
};
