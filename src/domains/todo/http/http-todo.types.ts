export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  rank: "low" | "high" | "medium";
}
