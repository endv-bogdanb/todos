import { type ValueError } from "@sinclair/typebox/errors";
import { factory } from "@skarab/ts-pojo-error";

export const errors = factory({
  HTTP: (response: Response) => ({
    message: "Http",
    status: response.status,
    text: response.statusText,
    url: response.url,
  }),
  PARSE: (response: Response, parseErrors: ValueError[]) => ({
    message: "Parse error",
    parseErrors,
    status: response.status,
    text: response.statusText,
    url: response.url,
  }),
});
