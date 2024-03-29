import { tasks } from "@/lib/data";
import { create } from "zustand";
import { TaskFormStore } from "./type";

export const useTasksStore = create<TaskFormStore>((set) => ({
  tasks: tasks,
  filteredTasks: tasks,
  confirmDelete: false,
  taskFiltered: false,
  selectedTask: null,
  isEdit: false,
  setIsEdit: (state) => set({ isEdit: state }),
  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
      filteredTasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setConfirmDelete: (confirm) => set({ confirmDelete: confirm }),
  addTask: (newTask) =>
    set((state) => ({
      tasks: [newTask, ...state.tasks],
      filteredTasks: [newTask, ...state.tasks],
    })),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      filteredTasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  filterTasks: (filters) => {
    set((state) => {
      const temp = [...state.tasks];

      const filteredTasks = temp.filter((task) => {
        const assigneeMatch =
          !filters.assignee ||
          task.assignee.toLowerCase().includes(filters.assignee.toLowerCase());
        const priorityMatch =
          !filters.priority || task.priority === filters.priority;

        const startDateMatch =
          !filters.startDate ||
          !task.startDate ||
          task.startDate >= filters.startDate;

        const endDateMatch =
          !filters.endDate || !task.endDate || task.endDate <= filters.endDate;

        return assigneeMatch && priorityMatch && startDateMatch && endDateMatch;
      });

      return { filteredTasks, taskFiltered: true };
    });
  },
  resetFilter: () =>
    set((state) => ({ filteredTasks: state.tasks, taskFiltered: false })),
  sortTasks: (priority) => {
    set((state) => ({
      filteredTasks: state.filteredTasks.sort((a, b) => {
        if (a.priority === priority) return -1;
        if (b.priority === priority) return 1;
        return 0;
      }),
    }));
  },
}));
