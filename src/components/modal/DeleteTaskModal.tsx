import { useTasksStore } from "@/hooks/use-tasksStore";
import Modal from "./Modal";
import { cn, delay } from "@/lib/utils";
import { Button } from "../ui/button";
import { CircleX, Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const DeleteTaskModal = () => {
  const {
    confirmDelete,
    setConfirmDelete,
    deleteTask,
    selectedTask,
    setSelectedTask,
  } = useTasksStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      setIsLoading(true);
      await delay();

      deleteTask(selectedTask.id);
      setSelectedTask(null);
      setConfirmDelete(false);
      setIsLoading(false);
      toast.info(`${selectedTask.title} Task has been Deleted`);
    }
  };

  return (
    <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
      <div
        className={cn(
          "bg-gradient-to-tr transition-all duration-300 bg-red-100 z-40 to-blue-100  sm:w-[30rem] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          confirmDelete ? "scale-100" : "scale-75"
        )}
      >
        <div className="flex items-center bg-white px-4 py-2 justify-between">
          <h3 className="font-bold text-lg">DELETE TASK </h3>
          <Button
            onClick={() => setConfirmDelete(false)}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            <CircleX />
          </Button>
        </div>
        <div className="py-4 px-4">
          <p className="capitalize text-lg">do you wish to delete task</p>
          <div className="flex mt-7 items-center justify-between">
            <h3 className="font-bold text-lg capitalize">
              {selectedTask?.title}
            </h3>
            <div className="flex items-center gap-x-4">
              <button
                onClick={handleConfirmDelete}
                className="text-white px-8 py-1 rounded-md active:scale-95 transition-all duration-500 bg-[#0369a1] hover:bg-[#036aa1d3] "
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Yes"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-white px-8 py-1 rounded-md active:scale-95 transition-all duration-500  bg-[#0369a1] hover:bg-[#036aa1d3]"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteTaskModal;
