import { type en } from "./en.resource";

export interface Resource {
  readonly translation: {
    readonly [TKey in keyof (typeof en)["translation"]]: string;
  };
}
