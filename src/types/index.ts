export type TaskType = {
  id: string;
  title: string;
  description?: string;
};

export type BoardColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};
