import fs from "node:fs/promises";
import path, { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import SQLite from "better-sqlite3";
import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import { type Database } from "./types.js";

const dialect = new SqliteDialect({
  database: new SQLite(join(dirname(fileURLToPath(import.meta.url)), "db.db")),
});

export const db = new Kysely<Database>({
  dialect,
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    migrationFolder: join(
      dirname(fileURLToPath(import.meta.url)),
      "migrations",
    ),
    path,
  }),
});

await migrator.migrateToLatest();
