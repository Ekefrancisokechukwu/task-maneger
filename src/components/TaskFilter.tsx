import React from "react";

import { DatePickerWithRange } from "./ui/DatePickerRange";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { CircleX, ListFilter, Loader2, RotateCcw } from "lucide-react";
import { useTasksStore } from "@/hooks/use-tasksStore";
import { Priority } from "./type";
import Modal from "./modal/Modal";
import TaskSort from "./TaskSort";
import { DateRange } from "react-day-picker";
import { delay } from "@/lib/utils";

type TaskFilterMobileProps = {
  isFilterMobile: boolean;
  setIsFilterMobile: React.Dispatch<React.SetStateAction<boolean>>;
  assigneeFilter: string;
  setAssigneeFilter: React.Dispatch<React.SetStateAction<string>>;
  priorityFilter: Priority | "";
  setPriorityFilter: React.Dispatch<React.SetStateAction<"" | Priority>>;
};

const TaskFilter = () => {
  const [isFilterMobile, setIsFilterMobile] = React.useState(false);
  const { filterTasks, taskFiltered, resetFilter } = useTasksStore();
  const [assigneeFilter, setAssigneeFilter] = React.useState<string>("");
  const [priorityFilter, setPriorityFilter] = React.useState<Priority | "">("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleResetFilter = () => {
    resetFilter();
    setAssigneeFilter("");
    setPriorityFilter("");
    setDate({ from: undefined, to: undefined });
  };

  const handleDateRange = () => {
    filterTasks({
      assignee: assigneeFilter,
      priority: priorityFilter as Priority,
      startDate: date?.from,
      endDate: date?.to,
    });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    filterTasks({
      assignee: e.target.value.toLowerCase().trim(),
      priority: priorityFilter as Priority,
    });
    setAssigneeFilter(value);
  };

  const handlePriorityChange = (value: Priority) => {
    setPriorityFilter(value);
    filterTasks({
      assignee: assigneeFilter.toLowerCase().trim(),
      priority: value,
    });
  };

  return (
    <div>
      <div className=" flex items-center gap-x-4">
        <Button
          onClick={() => setIsFilterMobile(!isFilterMobile)}
          variant={"outline"}
          size={"icon"}
          className="md:hidden grid"
        >
          <ListFilter />
        </Button>

        <div className="md:flex hidden lg:flex-row flex-col lg:items-center gap-x-4 gap-y-3">
          <h2 className="font-medium text-sm">Filter By:</h2>

          <div className="flex  items-center gap-x-4    gap-y-3">
            {/* filter by Name start */}
            <div className="">
              <input
                id="filter by"
                type="text"
                placeholder={"Assignee Name"}
                value={assigneeFilter}
                onChange={handleAssigneeChange}
                className="p-2 text-sm rounded-md placeholder:text-center text-gray-500"
              />
            </div>
            {/* filter by Name end */}

            {/* filter by P start */}
            <div className="lg:w-[10rem]">
              <Select
                value={priorityFilter}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="P0" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="text-gray-500">
                    <SelectItem value="P0">P0</SelectItem>
                    <SelectItem value="P1">P1</SelectItem>
                    <SelectItem value="P2">P2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* filter by P end */}

            {/* filter by Date start */}
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              handleDateRange={handleDateRange}
            />
            {/* filter by Date end */}
          </div>
        </div>
        {/* If the tasks are filtered show the button */}
        {taskFiltered && (
          <Button onClick={handleResetFilter} variant={"outline"} size={"icon"}>
            <RotateCcw />
          </Button>
        )}
      </div>
      <TaskSort />

      {/* Mobile View */}
      <TaskFilterMobile
        isFilterMobile={isFilterMobile}
        setIsFilterMobile={setIsFilterMobile}
        assigneeFilter={assigneeFilter}
        priorityFilter={priorityFilter}
        setAssigneeFilter={setAssigneeFilter}
        setPriorityFilter={setPriorityFilter}
      />
    </div>
  );
};
export default TaskFilter;

export const TaskFilterMobile = ({
  isFilterMobile,
  setIsFilterMobile,
  assigneeFilter,
  setAssigneeFilter,
  priorityFilter,
  setPriorityFilter,
}: TaskFilterMobileProps) => {
  const { filterTasks } = useTasksStore();
  const [loading, setLoading] = React.useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await delay();

    filterTasks({
      assignee: assigneeFilter,
      priority: priorityFilter as Priority,
      startDate: date?.from,
      endDate: date?.to,
    });

    setLoading(false);
    setIsFilterMobile(false);
  };

  return (
    <Modal
      isOpen={isFilterMobile}
      className={"md:hidden "}
      onClose={() => setIsFilterMobile(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="md:hidden flex z-30 flex-col w-full  bg-white fixed top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 p-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold">Filter Tasks by: </h3>
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setIsFilterMobile(false)}
          >
            <CircleX />
          </Button>
        </div>
        <div className="mt-5 space-y-4">
          <input
            id="filter by"
            type="text"
            placeholder={"Assignee Name"}
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="p-2 text-sm rounded-md w-full border text-gray-500"
          />
          <div className="w-full">
            <Select
              value={priorityFilter}
              onValueChange={(e: Priority) => setPriorityFilter(e)}
            >
              <SelectTrigger className="text-gray-500">
                <SelectValue placeholder="P0" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-gray-500">
                  <SelectItem value="P0">P0</SelectItem>
                  <SelectItem value="P1">P1</SelectItem>
                  <SelectItem value="P2">P2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            className="w-full"
          />
          <div className="flex  gap-x-4">
            <button
              disabled={loading}
              type="submit"
              className="py-1 px-4 rounded text-sm text-white bg-blue-600"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                " Apply filters"
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsFilterMobile(false)}
              className="py-1 px-4 rounded text-sm text-white bg-blue-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
