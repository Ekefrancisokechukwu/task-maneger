import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Task } from "@/hooks//type";

type TaskItem = {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
};

const TaskItem = ({ task, onDelete, onEdit }: TaskItem) => {
  return (
    <div className="bg-gray-200 rounded-md  text-sm px-2">
      <div className="flex justify-between py-3 border-black items-center  border-b">
        <h3 className="text-base font-bold capitalize">{task.title}</h3>

        <div className="w-7 h-7 grid place-items-center rounded bg-[#0369a1] text-white ">
          {task.priority}
        </div>
      </div>
      <p className="py-2  first-letter:uppercase">{task.description}</p>
      <div className="flex items-center  justify-between">
        <h3 className="font-semibold text-base capitalize">@{task.assignee}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={task.status === "Completed"}
            asChild
            className="!outline-none"
          >
            <button className="w-7 h-7 grid place-items-center rounded bg-[#0369a1] text-white">
              <EllipsisVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-300" />
            <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <button className="rounded cursor-default font-medium transition-all duration-500 text-white bg-[#0369a1] hover:bg-[#036aa1d3] my-3 px-10 py-1">
        {task.status === "Pending"
          ? "Assign"
          : task.status === "Completed"
          ? "Completed"
          : task.status === "In Progress"
          ? "In Progress"
          : task.status === "Deployed"
          ? "Deployed"
          : "Deferred"}
      </button>
    </div>
  );
};
export default TaskItem;
