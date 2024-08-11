import { type en } from "./en.resource";

type ResourceValue<T> = {
  readonly [TKey in keyof T]: T[TKey] extends string
    ? string
    : ResourceValue<T[TKey]>;
};

export interface Resource {
  readonly translation: ResourceValue<(typeof en)["translation"]>;
}
