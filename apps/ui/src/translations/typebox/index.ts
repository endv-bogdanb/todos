import {
  DefaultErrorFunction,
  SetErrorFunction,
  ValueErrorType,
} from "@sinclair/typebox/errors";
import i18next from "i18next";

SetErrorFunction((error) => {
  switch (error.errorType) {
    case ValueErrorType.StringMinLength: {
      return i18next.t("typebox.stringMinLength", {
        value: error.schema["minLength"] as number,
      });
    }
    case ValueErrorType.Union: {
      const values = (error.schema["anyOf"] as { const: string }[])
        .map((value) => value.const)
        .join(", ");
      return i18next.t("typebox.union", { values });
    }
    default: {
      return DefaultErrorFunction(error);
    }
  }
});
