import { Http } from "./http";

export interface BaseHttpRequest extends RequestInit {
  url: URL | string;
  timeout?: number;
  body?: XMLHttpRequestBodyInit;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  onProgress?: (ctx: {
    percentage: number;
    total: number;
    loaded: number;
  }) => void;
}

export type Head<T extends any[]> = T extends [...infer Head, any?]
  ? Head
  : never;

export type EnhanceHttpQueryKey<T extends Http> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? K extends "download"
      ? T[K]
      : T[K] & {
          queryKey: (
            ...values: Head<Parameters<T[K]>> extends [...infer U]
              ? Partial<U>
              : never
          ) => unknown[];
        }
    : T[K];
};
