import * as taskContants from "../contants/task";
import { toastError, toastSuccess } from "../helpers/toastHelper";

const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskContants.FETCH_TASK:
      return {
        ...state,
        listTask: [],
      };
    case taskContants.FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskContants.FETCH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    }
    case taskContants.FILLTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskContants.ADD_TASK: {
      return {
        ...state,
      };
    }
    case taskContants.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Add new task successfully");
      return {
        ...state,
        listTask: [data].concat(state.listTask),
      };
    }
    case taskContants.ADD_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskContants.SET_TASK_EDITING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task,
      };
    }
    case taskContants.UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case taskContants.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listTask.splice(0, index),
          data,
          ...listTask.splice(index + 1),
        ];
        toastSuccess("Update task successful");
        return {
          ...state,
          listTask: newList,
        };
      }
      return {
        ...state,
      };
    }
    case taskContants.UPDATE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskContants.DELETE_TASK: {
      return {
        ...state,
      };
    }
    case taskContants.DELETE_TASK_SUCCESS: {
      const { data: taskId } = action.payload; // task.id
      toastSuccess("Delete task successful");

      return {
        ...state,
        listTask: state.listTask.filter((item) => item.id !== taskId),
      };
    }
    case taskContants.DELETE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default reducer;
