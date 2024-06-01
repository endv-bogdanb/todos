import {
  type ColumnType,
  type Generated,
  type Insertable,
  type Selectable,
  type Updateable,
} from "kysely";

export interface TodoTable {
  created_at: ColumnType<Date, string | undefined, never>;
  description: string;
  id: Generated<number>;
  rank: "low" | "high";
  title: string;
  updated_at: ColumnType<Date, never, string | undefined>;
}

export type Todo = Selectable<TodoTable>;
export type NewTodo = Insertable<TodoTable>;
export type TodoUpdate = Updateable<TodoTable>;

export interface Database {
  todo: TodoTable;
}
