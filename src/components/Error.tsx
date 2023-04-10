import { FC } from "react";
import { HttpError } from "../utils";

export interface IError {
  error?: HttpError | null;
  retry: () => void;
}

export const Error: FC<IError> = ({ error, retry }) => {
  if (error?.recoverable) {
    return (
      <button type="button" onClick={() => retry()}>
        {" "}
        retry{" "}
      </button>
    );
  }

  return <span>{error?.message ?? "Invalid error"}</span>;
};
