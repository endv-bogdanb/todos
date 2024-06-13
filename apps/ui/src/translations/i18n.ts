import { initReactI18next } from "react-i18next";
import { type RowData } from "@tanstack/react-table";
import i18n, { type TFunction } from "i18next";
import { resources } from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en"];
  }
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    t: TFunction;
  }
}

void i18n.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  interpolation: { escapeValue: false },
  lng: "en",
  resources: resources as unknown as (typeof resources)["en"],
});

export default i18n;
