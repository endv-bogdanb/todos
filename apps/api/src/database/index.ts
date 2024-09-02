import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import SQLite from "better-sqlite3";
import {
  Kysely,
  type Migration,
  type MigrationProvider,
  Migrator,
  SqliteDialect,
} from "kysely";
import { match } from "ts-pattern";
import { type Database } from "./types.js";

const dialect = new SqliteDialect({
  database: new SQLite(join(dirname(fileURLToPath(import.meta.url)), "db.db")),
});

export const db = new Kysely<Database>({
  dialect,
});

const isMigration = (obj: unknown): obj is Migration => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "up" in obj &&
    typeof obj.up === "function"
  );
};

const isDefaultModuleMigration = (
  obj: unknown,
): obj is { default: Migration } =>
  obj !== null &&
  typeof obj === "object" &&
  "default" in obj &&
  isMigration(obj.default);

class EsmFileManager implements MigrationProvider {
  private readonly migrationsFolder = join(
    dirname(fileURLToPath(import.meta.url)),
    "migrations",
  );

  getMigrations = async (): Promise<Record<string, Migration>> => {
    const files = await fs.readdir(this.migrationsFolder);

    return (
      await Promise.all(
        files.map(async (fileName) => ({
          // eslint-disable-next-line no-magic-numbers
          key: fileName.substring(0, fileName.lastIndexOf(".")),
          module: (await import(
            `./${join("migrations", fileName).replaceAll("\\", "/")}`
          )) as unknown,
        })),
      )
    ).reduce<Record<string, Migration>>((acc, { key, module }) => {
      return match(module)
        .when(isDefaultModuleMigration, (value) => ({
          ...acc,
          [key]: value.default,
        }))
        .when(isMigration, (value) => ({
          ...acc,
          [key]: value,
        }))
        .otherwise(() => acc);
    }, {});
  };
}

const migrator = new Migrator({
  db,
  provider: new EsmFileManager(),
});

await migrator.migrateToLatest();
