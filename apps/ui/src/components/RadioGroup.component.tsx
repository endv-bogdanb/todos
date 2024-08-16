import {
  type DetailedHTMLProps,
  type FieldsetHTMLAttributes,
  type ReactNode,
} from "react";
import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

export interface RadioGroupProps<
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
        FieldsetHTMLAttributes<HTMLFieldSetElement>,
        HTMLFieldSetElement
      >,
      "name" | "defaultValue" | "disabled"
    > {
  children: ReactNode;
  label: string;
}

export const RadioGroup = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: RadioGroupProps<TFieldValues, TName>,
) => {
  const {
    control,
    name,
    label,
    defaultValue,
    disabled = false,
    shouldUnregister = false,
    children,
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
    <fieldset name={name} disabled={field.disabled} {...rest}>
      <legend>{label}</legend>
      {children}
      <div>{fieldState.invalid && fieldState.error?.message}</div>
    </fieldset>
  );
};
