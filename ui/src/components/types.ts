export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export interface Project {
  title: string;
  id: string;
  createdAt: string
}
