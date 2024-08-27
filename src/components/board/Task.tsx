type TaskProps = {
  task: any;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className=" p-2 rounded shadow mb-2">
      <h5>{task.title}</h5>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
