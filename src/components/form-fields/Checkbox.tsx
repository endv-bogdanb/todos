import { FC } from "react";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { IField } from "./form-fields.types";

export interface ICheckbox
  extends IField,
    Partial<Pick<HTMLInputElement, "disabled">> {}

export const Checbox: FC<ICheckbox> = ({
  name,
  label,
  control,
  disabled,
  className,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <div>
      <label className={clsx(className)}>
        {label}
        <input
          ref={field.ref}
          name={field.name}
          checked={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
          aria-disabled={disabled ? "true" : "false"}
          type="checkbox"
          aria-checked={field.value ? "true" : "false"}
        />
      </label>
    </div>
  );
};
