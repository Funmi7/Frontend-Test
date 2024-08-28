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

export type PopupItemsType = {
  text: string;
  func: () => void;
};
