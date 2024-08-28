"use client";

import { FC, useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { GoPlus } from "react-icons/go";

import Task from "@/components/board/Task";
import { BoardColumnType, TaskType } from "@/types";
import TaskInput from "./AddTaskInput";

type BoardColumnProps = {
  column: BoardColumnType;
};

const BoardColumn: FC<BoardColumnProps> = ({ column }) => {
  const [inputMode, setInputMode] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="bg-gray-200 dark:bg-inherit p-4 rounded-lg flex flex-col  w-[348px]">
      <h5 className="font-medium text-md mb-4">{column.title}</h5>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="flex flex-col gap-4">
              {column?.tasks?.map((task: TaskType, index: number) => (
                <Task
                  key={task.id}
                  task={task}
                  itemIndex={index}
                  columnId={column.id}
                />
              ))}
              {provided.placeholder}
            </div>
            {inputMode ? (
              <TaskInput
                columnId={column.id}
                closeEditMode={() => setInputMode(false)}
              />
            ) : (
              <button
                onClick={() => setInputMode(true)}
                className="mt-4 flex text-xs align-middle gap-2"
              >
                <div className="mb-3">
                  <GoPlus fontSize="1rem" />
                </div>{" "}
                Add New Task
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default BoardColumn;
