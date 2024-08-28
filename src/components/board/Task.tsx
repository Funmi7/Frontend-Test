import { useBoardStore } from "@/store/board-store";
import { TaskType } from "@/types";
import { Fragment, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskInput from "./AddTaskInput";

type TaskProps = {
  task: TaskType;
  itemIndex: number;
  columnId: string;
  // editMode: boolean;
  // toggleEditMode: (bool: boolean) => void;
};

const Task: React.FC<TaskProps> = ({
  task,
  itemIndex,
  columnId,
  // editMode,
  // toggleEditMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const handleDeleteTask = () => {
    deleteTask(columnId, task.id);
  };

  return (
    <Fragment>
      {editMode ? (
        <TaskInput
          columnId={columnId}
          closeEditMode={() => setEditMode(false)}
          taskToEdit={task}
        />
      ) : (
        <Draggable key={task.id} draggableId={task.id} index={itemIndex}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className=" p-2 rounded shadow mb-2">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </div>
              <button onClick={handleDeleteTask}>Delete</button>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </Draggable>
      )}
    </Fragment>
  );
};

export default Task;
