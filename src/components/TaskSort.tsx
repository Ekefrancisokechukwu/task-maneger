import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTasksStore } from "@/hooks/use-tasksStore";
import { Priority } from "./type";

const TaskSort = () => {
  const [sortCriteria, setSortCriteria] = React.useState("");
  const { sortTasks } = useTasksStore();

  const handleSortChange = (value: Priority) => {
    setSortCriteria(value);
    sortTasks(value);
  };

  return (
    <div className="mt-4 flex max-[600px]:flex-col gap-y-3 items-center max-[600px]:items-start gap-x-5">
      <h2 className="font-medium text-sm">Sort By:</h2>
      {/* sort by Pr start */}
      <div className="w-[11rem] max-sm:w-20">
        <Select value={sortCriteria} onValueChange={handleSortChange}>
          <SelectTrigger className="text-gray-500">
            <SelectValue placeholder="Sort priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="text-gray-500">
              <SelectItem value="P0"> P0</SelectItem>
              <SelectItem value="P1"> P1</SelectItem>
              <SelectItem value="P2"> P2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* sort by P end */}
    </div>
  );
};
export default TaskSort;
