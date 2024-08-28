import { ChangeEvent, useEffect, useState } from "react";

import { useBoardStore } from "@/store/board-store";
import { TaskType } from "@/types";

const initialValues = { title: "", description: "" };

type TaskInputProps = {
  columnId: string;
  closeEditMode: () => void;
  taskToEdit?: TaskType;
};

const TaskInput: React.FC<TaskInputProps> = ({
  columnId,
  closeEditMode,
  taskToEdit,
}) => {
  const [taskValues, setTaskValues] = useState(initialValues);
  const addTask = useBoardStore((state) => state.addTask);
  const editTask = useBoardStore((state) => state.editTask);

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTaskValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    addTask(columnId, taskValues);
    setTaskValues(initialValues);
    closeEditMode();
  };

  const handleEditTask = () => {
    if (taskToEdit) {
      editTask(columnId, taskToEdit.id, taskValues);
      closeEditMode();
    }
  };

  useEffect(() => {
    if (taskToEdit) {
      setTaskValues((prev) => ({
        ...prev,
        title: taskToEdit.title,
        description: taskToEdit.description ?? "",
      }));
    }
  }, [taskToEdit]);

  return (
    <div className="p-4 rounded bg-white dark:bg-black-200 min-h-[100px] mt-4">
      <div className="w-full flex flex-col gap-3">
        <input
          type="text"
          value={taskValues.title}
          onChange={handleValueChange}
          name="title"
          placeholder="Task title"
          className="p-2 text-black text-xs w-full focus:outline-none focus:ring-0"
        />

        <textarea
          value={taskValues.description}
          onChange={handleValueChange}
          name="description"
          placeholder="Task description"
          className="p-2 text-black text-xs w-full focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex gap-3 w-full mt-4">
        <button
          onClick={closeEditMode}
          className="p-2 bg-gray-200 text-black rounded text-xs"
        >
          Cancel
        </button>
        <button
          onClick={taskToEdit ? handleEditTask : handleAddTask}
          className="p-2 bg-purple text-white rounded text-xs"
        >
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
