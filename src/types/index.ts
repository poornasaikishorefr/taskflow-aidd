export type TaskPriority = "high" | "medium" | "low";

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string; // ISO date string (e.g. "2026-03-31")
  completed: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
};

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

