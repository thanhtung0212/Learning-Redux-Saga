import * as taskContants from "../contants/task";
import { toastError } from "../helpers/toastHelper";

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
    default:
      return state;
  }
};
export default reducer;
