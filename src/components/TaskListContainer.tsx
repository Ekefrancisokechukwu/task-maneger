import { useTasksStore } from "@/hooks/use-tasksStore";
import TaskList from "./TaskList";

const TaskListContainer = () => {
  const { filteredTasks } = useTasksStore();

  return (
    <div className="flex items-start gap-x-5 snap-x snap-mandatory  overflow-x-auto pb-3 ">
      <TaskList
        title="Pending"
        tasks={filteredTasks.filter((task) => task.status === "Pending")}
      />

      <TaskList
        title="In Progress"
        tasks={filteredTasks.filter((task) => task.status === "In Progress")}
      />

      <TaskList
        title="Completed"
        tasks={filteredTasks.filter((task) => task.status === "Completed")}
      />

      <TaskList
        title="Deployed"
        tasks={filteredTasks.filter((task) => task.status === "Deployed")}
      />

      <TaskList
        title="Deferred"
        tasks={filteredTasks.filter((task) => task.status === "Deferred")}
      />
    </div>
  );
};
export default TaskListContainer;
