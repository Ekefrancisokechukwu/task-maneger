export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  team: string;
  priority: "P0" | "P1" | "P2";
  status: "Pending" | "In Progress" | "Completed" | "Deployed" | "Deferred";
  startDate: Date;
  endDate?: Date;
};

export type TaskFormStore = {
  isOpen: boolean;
  tasks: Task[];
  addTask: (newTask: Task) => void;
  openModal: () => void;
  closeModal: () => void;
  deleteTask: (taskId: string) => void;
  confirmDelete: boolean;
  setConfirmDelete: (confirm: boolean) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isEdit: boolean;
  setIsEdit: (state: boolean) => void;
  editTask: (updatedTask: Task) => void;
  taskFiltered: boolean;
  filteredTasks: Task[];
  filterTasks: (filters: {
    assignee?: string;
    priority?: "P0" | "P1" | "P2";
    startDate?: Date;
    endDate?: Date;
  }) => void;
  resetFilter: () => void;
  sortTasks: (priority: "P0" | "P1" | "P2") => void;
};
