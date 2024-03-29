import { useTasksStore } from "@/hooks/use-tasksStore";
import TaskItem from "./TaskItem";

import { StatusOptions } from "./type";
import { Task } from "@/hooks/type";

type TaskList = {
  tasks: Task[];
  title: StatusOptions;
};

const TaskList = ({ tasks, title }: TaskList) => {
  const { setConfirmDelete, setIsEdit, setSelectedTask, taskFiltered } =
    useTasksStore();

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setConfirmDelete(true);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEdit(true);
  };

  const bgColor =
    title === "Pending"
      ? "#bab7b2 "
      : title === "In Progress"
      ? "#ca8a04"
      : title === "Completed"
      ? "#0ba71b"
      : title === "Deployed"
      ? "#1e1b4b"
      : "#fca5a5";

  return (
    <div className="w-[15rem] snap-start snap-always  max-[500px]:w-[90%] rounded-lg bg-white  flex-grow flex-shrink-0">
      <h1
        style={{ backgroundColor: bgColor }}
        className="text-base font-bold text-center py-3  rounded-t-lg text-white  "
      >
        {title}
      </h1>
      <div className="bg-white min-h-[19rem]  p-2.5 space-y-5 rounded-b-lg">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => handleDeleteClick(task)}
              onEdit={() => handleEditClick(task)}
            />
          );
        })}
        {tasks.length === 0 && taskFiltered && (
          <h1 className="text-center font-semibold mt-11">
            No Matching filter task
          </h1>
        )}
      </div>
    </div>
  );
};
export default TaskList;
