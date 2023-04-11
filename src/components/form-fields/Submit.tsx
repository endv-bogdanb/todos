import { forwardRef } from "react";
import clsx from "clsx";
import { useFormState } from "react-hook-form";
import { IField } from "./form-fields.types";

export interface ISubmit
  extends Pick<IField, "label" | "className" | "control">,
    Partial<Pick<HTMLButtonElement, "disabled">> {}

export const Submit = forwardRef<HTMLButtonElement, ISubmit>(
  ({ label, control, disabled, className }, ref) => {
    const { isDirty, isValid, isValidating } = useFormState({
      control,
    });

    return (
      <button
        className={clsx(className)}
        ref={ref}
        disabled={disabled || !isDirty || isValidating || !isValid}
        aria-disabled={disabled ? "true" : "false"}
        type={"submit"}
      >
        {label}
      </button>
    );
  }
);
