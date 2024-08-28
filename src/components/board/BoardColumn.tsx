"use client";

import { FC, Fragment, useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
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
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col">
      <h2 className="font-bold text-lg mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Fragment>
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
              <button onClick={() => setInputMode(true)}>Add New Task</button>
            )}
          </Fragment>
        )}
      </Droppable>
    </div>
  );
};
export default BoardColumn;
