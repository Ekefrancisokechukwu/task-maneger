import { useTasksStore } from "@/hooks/use-tasksStore";
import Modal from "./modal/Modal";
import { cn, delay } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleX, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React from "react";
import { Priority, StatusOptions } from "./type";
import { toast } from "sonner";
import { Task } from "@/hooks/type";

const TaskEditForm = () => {
  const { selectedTask, setIsEdit, isEdit, editTask } = useTasksStore();
  const [priority, setPriority] = React.useState<Priority | "">("");
  const [status, setStatus] = React.useState<StatusOptions | "">("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isValuesChanged, setIsValuesChanged] = React.useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTask && !isLoading) {
      const updatedTask: Task = {
        ...selectedTask,
        priority: priority || selectedTask.priority,
        status: status || selectedTask.status,
        endDate: status === "Completed" ? new Date(Date.now()) : undefined,
      };
      setIsLoading(true);
      await delay();

      editTask(updatedTask);
      closeEditForm();
      setIsLoading(false);
      toast.success("Task Modified");
    }
  };

  React.useEffect(() => {
    if (selectedTask) {
      setPriority(selectedTask.priority);
      setStatus(selectedTask.status);
    }
  }, [selectedTask]);

  React.useEffect(() => {
    // Checks if any changed was made
    if (
      priority !== selectedTask?.priority ||
      status !== selectedTask?.status
    ) {
      setIsValuesChanged(false);
    } else {
      setIsValuesChanged(true);
    }
  }, [priority, selectedTask?.priority, selectedTask?.status, status]);

  const closeEditForm = () => {
    setIsEdit(false);
  };

  return (
    <Modal isOpen={isEdit} onClose={closeEditForm}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "bg-gradient-to-tr transition-all overflow-y-auto max-sm:h-[100vh] duration-300 bg-red-100 z-40 to-blue-100  sm:w-[30rem] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          isEdit ? "scale-100" : "scale-75"
        )}
      >
        <div className="flex items-center bg-white px-4 py-2 justify-between">
          <h3 className="font-bold text-lg">Edit Task </h3>
          <Button
            onClick={closeEditForm}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            <CircleX />
          </Button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="text-lg capitalize ">
              Title:
            </label>
            <input
              disabled
              aria-disabled="true"
              type="text"
              id="title"
              defaultValue={selectedTask?.title}
              className="w-full p-2 rounded-sm bg-neutral-300"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="text-lg capitalize ">
              Description:
            </label>
            <textarea
              disabled
              aria-disabled="true"
              defaultValue={selectedTask?.description}
              className="w-full resize-none p-2 rounded-sm bg-neutral-300 h-[4rem]"
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="text-lg capitalize ">
              Team:
            </label>
            <input
              disabled
              aria-disabled="true"
              type="text"
              id="title"
              defaultValue={selectedTask?.team}
              className="w-full p-2 rounded-sm bg-neutral-300"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="text-lg capitalize ">
              Assignee:
            </label>
            <input
              disabled
              aria-disabled="true"
              type="text"
              id="title"
              defaultValue={selectedTask?.assignee}
              className="w-full p-2 rounded-sm bg-neutral-300"
            />
          </div>

          <div className="flex items-center justify-between gap-x-5">
            {/* priority input */}

            <div className="flex items-center sm:gap-x-4 gap-x-3">
              <label htmlFor="priority" className="text-lg">
                Priority
              </label>
              <Select
                value={priority || selectedTask?.priority}
                onValueChange={(value: "P0" | "P1" | "P2") =>
                  setPriority(value)
                }
              >
                <SelectTrigger id="priority" className="!ring-0">
                  <SelectValue
                    placeholder={selectedTask?.priority}
                    className="!outline-none"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"P0"}>P0</SelectItem>
                    <SelectItem value={"P1"}>P1</SelectItem>
                    <SelectItem value={"P2"}>P2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Status input */}
            <div className="flex items-center sm:gap-x-5 gap-x-3 w-[13rem]">
              <label htmlFor="status" className="sm:text-lg text-base">
                Status
              </label>
              <Select
                value={status || selectedTask?.status}
                onValueChange={(value: StatusOptions) => setStatus(value)}
              >
                <SelectTrigger id="priority" className="!ring-0">
                  <SelectValue
                    placeholder="Pending"
                    className="!outline-none"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"Pending"}>Pending</SelectItem>
                    <SelectItem value={"In Progress"}>In Progress</SelectItem>
                    <SelectItem value={"Completed"}>Completed</SelectItem>
                    <SelectItem value={"Deployed"}>Deployed</SelectItem>
                    <SelectItem value={"Deferred"}>Deferred</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <footer className="bg-white py-4 px-4">
          <div className="flex items-center justify-end gap-x-10">
            <button
              disabled={isValuesChanged || isLoading}
              aria-disabled={isLoading}
              type="submit"
              className="px-8 py-1 bg-[#0369a1] disabled:bg-[#036aa177] disabled:cursor-not-allowed active:scale-95 transition-all duration-300 hover:bg-[#036aa1d6] rounded text-white font-semibold"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
            </button>
            <button
              type="button"
              onClick={closeEditForm}
              className="px-8 py-1 bg-[#0369a1]  active:scale-95 transition-all duration-300 hover:bg-[#036aa1d6] rounded text-white font-semibold"
            >
              Cancel
            </button>
          </div>
        </footer>
      </form>
    </Modal>
  );
};
export default TaskEditForm;
