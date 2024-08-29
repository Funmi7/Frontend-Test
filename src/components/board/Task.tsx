import { BsThreeDots } from "react-icons/bs";
import { Fragment, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useBoardStore } from "@/store/board-store";
import { TaskType } from "@/types";
import TaskInput from "./AddTaskInput";
import Popup from "../common/Popup";
import { cn } from "@/utils/Functions";

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
  const [showPopup, setShowPopup] = useState(false);

  const deleteTask = useBoardStore((state) => state.deleteTask);

  const handleDeleteTask = () => {
    deleteTask(columnId, task.id);
  };

  const handleCloseEditMode = () => {
    setEditMode(false);
    setShowPopup(false);
  };

  const popupItems = [
    {
      text: "Edit",
      func: () => setEditMode(true),
    },
    {
      text: "Delete",
      func: () => handleDeleteTask(),
    },
  ];

  return (
    <Fragment>
      {editMode ? (
        <TaskInput
          columnId={columnId}
          closeEditMode={handleCloseEditMode}
          taskToEdit={task}
        />
      ) : (
        <Draggable key={task.id} draggableId={task.id} index={itemIndex}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={cn(
                "p-2 xl:p-4 rounded bg-white dark:bg-black-200 min-h-[100px] hover:bg-gray-100 hover:dark:bg-black-400",
                snapshot && snapshot.isDragging
                  ? "bg-gray-400 dark:bg-black-500 border-gray-200"
                  : "bg-white"
              )}
            >
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between">
                  <h5 className="text-sm">{task.title}</h5>
                  <div
                    onClick={() => setShowPopup(true)}
                    className="relative"
                    data-testid="three-dot-wrap"
                  >
                    <BsThreeDots />
                    {showPopup && (
                      <Popup
                        items={popupItems}
                        closePopup={() => setShowPopup(false)}
                      />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-300">{task.description}</p>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </Fragment>
  );
};

export default Task;
