import { factory } from "@skarab/ts-pojo-error";

export const errors = factory({
  HTTP: (response: Response) => ({
    message: "Http",
    status: response.status,
    text: response.statusText,
    url: response.url,
  }),
  PARSE: (response: Response) => ({
    message: "Parse error",
    status: response.status,
    text: response.statusText,
    url: response.url,
  }),
});
