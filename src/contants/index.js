import AdminHomePage from "../containers/AdminHomePage";
import TaskForm from "../containers/TaskForm";
import TaskBoard from "../containers/Taskboard";

export const API_ENDPOINT = "http://localhost:3000";

export const STATUSES = [
  {
    value: 0,
    label: "READY",
  },
  {
    value: 1,
    label: "IN PROGRESS",
  },
  {
    value: 2,
    label: "COMPLETED",
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATE: 202,
};

export const ADMIN_ROUTES = [
  {
    path: "/",
    name: "Trang quản trị",
    exact: true,
    component: AdminHomePage,
  },
  {
    path: "/task-board",
    name: "Quản lý công việc",
    component: TaskBoard,
  },
  {
    path: "/task-form",
    name: "Quản lý công việc",
    component: TaskForm,
  },
];
