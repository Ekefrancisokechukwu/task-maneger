import TaskCreateForm from "@/components/TaskCreateForm";
import TaskEditForm from "@/components/TaskEditForm";
import TaskFilter from "@/components/TaskFilter";
import TaskListContainer from "@/components/TaskListContainer";
import DeleteTaskModal from "@/components/modal/DeleteTaskModal";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useTasksStore } from "@/hooks/use-tasksStore";

const Tasks = () => {
  const { openModal } = useTasksStore();
  return (
    <main className="max-w-[1280px] mx-auto ">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Task Board</h1>
        <Button variant={"outline"} size={"icon"} className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </Button>
      </header>
      <section className="border-2 border-white rounded-lg sm:p-8 p-4 mt-6 min-h-[34rem] ">
        <div className="flex items-center gap-x-7 justify-between">
          <TaskFilter />

          <button
            onClick={openModal}
            className="bg-[#0369a1] self-start active:scale-95 w-[15rem]  hover:bg-[#036aa1bb] duration-500 transition-all text-white font-medium text-sm px-4 py-2 rounded-md"
          >
            Add New Task
          </button>
        </div>
        <div className="mt-6">
          <TaskListContainer />
        </div>
      </section>
      <TaskCreateForm />
      <DeleteTaskModal />
      <TaskEditForm />
      <Toaster position="top-center" />
    </main>
  );
};
export default Tasks;
