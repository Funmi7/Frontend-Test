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

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className="mb-4 w-full">
      <div className="w-full flex-col gap-2">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={taskValues.title}
            onChange={handleValueChange}
            name="title"
            placeholder="Add new task title"
            className="p-2 border rounded text-black"
          />
        </div>

        <div>
          <label>Description (optional)</label>
          <input
            type="text"
            value={taskValues.description}
            onChange={handleValueChange}
            name="description"
            placeholder="Add new task description"
            className="p-2 border rounded text-black"
          />
        </div>
      </div>
      <div className="flex gao-3">
        <button
          onClick={closeEditMode}
          className="ml-2 p-2 bg-grey text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={taskToEdit ? handleEditTask : handleAddTask}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
