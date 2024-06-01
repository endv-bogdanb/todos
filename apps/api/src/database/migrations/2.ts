import { type Kysely } from "kysely";
import { type Database } from "../types.js";

export async function up(db: Kysely<Database>): Promise<void> {
  await db
    .insertInto("todo")
    .values([
      {
        description: "Todo 1 description",
        rank: "low",
        title: "Todo 1",
      },
      {
        description: "Todo 2 description",
        rank: "low",
        title: "Todo 2",
      },
      {
        description: "Todo 3 description",
        rank: "high",
        title: "Todo 3",
      },
    ])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.deleteFrom("todo").execute();
}
