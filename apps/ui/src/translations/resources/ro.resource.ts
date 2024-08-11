import { type Resource } from "./resources.types";

export const ro: Resource = {
  translation: {
    back: "Înapoi",
    create: "+ adăuga",
    edit: "Editează",
    todoForm: {
      create: "Adăuga",
      description: "Descriere",
      edit: "Editează",
      rank: {
        high: "Ridicat",
        low: "Scăzut",
        title: "Rang",
      },
      title: "Titlu",
    },
    todoTable: {
      headerActions: "Acțiuni",
      headerDescription: "Descriere",
      headerTitle: "Titlu",
      title: "Tabel todos",
    },
    typebox: {
      stringMinLength:
        "Lungimea șirului estimată mai mare sau egală cu {{value}}",
      union: "Valoarea așteptată a uniunii {{values}}",
    },
    "Welcome to React": "Bun venit la React și react-i18next",
  },
} as const;
