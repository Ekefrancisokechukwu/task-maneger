import { CircleX, Loader2 } from "lucide-react";
import Modal from "./modal/Modal";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTasksStore } from "@/hooks/use-tasksStore";
import { cn, delay } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";
import { Priority, StatusOptions } from "./type";
import { Task } from "@/hooks/type";

const TaskCreateForm = () => {
  const { closeModal, isOpen, addTask } = useTasksStore();
  const [inputValues, setInputValues] = React.useState({
    title: "",
    description: "",
    team: "",
    assignee: "",
  });
  const [priority, setPriority] = React.useState<"P0" | "P1" | "P2">("P0");
  const [status, setStatus] = React.useState<StatusOptions>("Pending");

  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    // Error handling  returns error message Start;
    const { assignee, description, team, title } = inputValues;
    const errors: { [key: string]: string } = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (!assignee.trim()) {
      errors.assignee = "Assignee is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!team.trim()) {
      errors.team = "Team is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { assignee, description, team, title } = inputValues;

    if (validateForm() && !isLoading) {
      setIsLoading(true);

      // A loading state to enhance the user experience
      // Simulates delay using a promise (e.g., 2 seconds)
      await delay();

      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        assignee,
        team,
        priority: priority,
        status: status,
        startDate: new Date(Date.now()),
        endDate: status === "Completed" ? new Date(Date.now()) : undefined,
      };

      addTask(newTask);
      handleCloseModal();
      setIsLoading(false);
      toast.success("Task Created ");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCloseModal = () => {
    setInputValues({
      title: "",
      description: "",
      team: "",
      assignee: "",
    });
    setFormErrors({});
    setPriority("P0");
    setStatus("Pending");
    closeModal();
  };

  return (
    <Modal onClose={handleCloseModal} isOpen={isOpen}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "bg-gradient-to-tr transition-all overflow-y-auto max-sm:h-[100vh] duration-300 bg-red-100 z-40 to-blue-100    sm:w-[30rem] w-full   fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          isOpen ? "scale-100" : "scale-75"
        )}
      >
        <div className="flex items-center bg-white px-4 py-2 justify-between">
          <h3 className="font-bold text-lg uppercase">Create Task </h3>
          <Button
            onClick={handleCloseModal}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            <CircleX />
          </Button>
        </div>

        {/* inputs values */}

        <div className="py-4 px-4 space-y-6">
          <div className="flex sm:flex-row flex-col relative sm:items-center gap-y-4 justify-between gap-x-5">
            <label htmlFor="title" className="capitalize">
              title
            </label>
            <div className="sm:w-[75%] w-full relative">
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={inputValues.title}
                id="title"
                className="w-full p-2 rounded-sm"
              />
              {formErrors.title && (
                <p className="absolute text-sm   top-[110%] text-red-400">
                  {formErrors.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-y-4 justify-between gap-x-5">
            <label htmlFor="desc" className="capitalize">
              description
            </label>

            <div className=" sm:w-[75%] w-full relative">
              <textarea
                id="desc"
                name="description"
                onChange={handleChange}
                value={inputValues.description}
                className="p-2 w-full rounded-sm h-[5rem] resize-none"
              ></textarea>

              {formErrors.description && (
                <p className="absolute text-sm   top-[100%] text-red-400">
                  {formErrors.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center gap-y-4 justify-between gap-x-5">
            <label htmlFor="team" className="capitalize">
              team
            </label>
            <div className="sm:w-[75%] w-full relative">
              <input
                type="text"
                id="team"
                name="team"
                onChange={handleChange}
                value={inputValues.team}
                className="w-full p-2 rounded-sm"
              />
              {formErrors.team && (
                <p className="absolute text-sm   top-[100%] text-red-400">
                  {formErrors.team}
                </p>
              )}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-y-4 justify-between gap-x-5">
            <label htmlFor="assignee" className="capitalize">
              assignee
            </label>
            <div className="sm:w-[75%] w-full relative">
              <input
                type="text"
                id="assignee"
                name="assignee"
                onChange={handleChange}
                value={inputValues.assignee}
                className="w-full p-2 rounded-sm"
              />
              {formErrors.assignee && (
                <p className="absolute text-sm   top-[100%] text-red-400">
                  {formErrors.assignee}
                </p>
              )}
            </div>
          </div>

          <div className="flex  items-center justify-between gap-x-5">
            <label htmlFor="priority" className="capitalize">
              priority
            </label>
            <div className="w-[75%] flex items-center justify-between">
              <div>
                <Select
                  value={priority}
                  onValueChange={(value: Priority) => setPriority(value)}
                >
                  <SelectTrigger id="priority" className="!ring-0">
                    <SelectValue placeholder="P1" className="!outline-none" />
                  </SelectTrigger>
                  <SelectContent className="!outline-none">
                    <SelectGroup className="!outline-none">
                      <SelectItem value={"P0"}>P0</SelectItem>
                      <SelectItem value={"P1"}>P1</SelectItem>
                      <SelectItem value={"P2"}>P2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Status select inputs */}
              <div className="flex items-center gap-x-5 w-[13rem]">
                <label htmlFor="status">Status</label>
                <Select
                  value={status}
                  onValueChange={(value: StatusOptions) => setStatus(value)}
                >
                  <SelectTrigger id="priority" className="!ring-0">
                    <SelectValue
                      placeholder="Pending"
                      className="!outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="!outline-none">
                    <SelectGroup className="!outline-none">
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

          {/* submit btn */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-[#0369a1] disabled:cursor-not-allowed active:scale-95 transition-all duration-300 hover:bg-[#036aa1d6] rounded text-white font-semibold"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default TaskCreateForm;
