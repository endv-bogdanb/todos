import { Children, FC, ReactNode } from "react";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { IField } from "./form-fields.types";

export interface ISelect
  extends IField,
    Partial<Pick<HTMLSelectElement, "disabled">> {
  children: ReactNode;
}

export const Select: FC<ISelect> = ({
  name,
  label,
  control,
  disabled,
  className,
  children,
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
        <select
          ref={field.ref}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
          aria-disabled={disabled ? "true" : "false"}
        >
          {children}
        </select>
      </label>
    </div>
  );
};
