import { FC } from "react";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { IField } from "./form-fields.types";

export interface IInput
  extends IField,
    Partial<Pick<HTMLInputElement, "disabled">> {
  type?: "text" | "search";
}

export const Input: FC<IInput> = ({
  name,
  label,
  control,
  type = "text",
  disabled,
  className,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div>
      <label className={clsx(className)}>
        {label}
        <input
          ref={field.ref}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
          aria-disabled={disabled ? "true" : "false"}
          type={type}
        />
      </label>
    </div>
  );
};
