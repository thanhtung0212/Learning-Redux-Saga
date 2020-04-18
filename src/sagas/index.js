import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import * as taskTypes from "../contants/task";
import { getList, addTask } from "../apis/task";
import { STATUS_CODE, STATUSES } from "../contants/index";
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  addTaskSuccess,
  addTaskFailed,
  fetchListTask,
} from "../actions/task";
import { showLoading, hideLoading } from "../actions/ui";
import { hideModal } from "../actions/modal";

/**
 * B1: Thực thi action Fetch Task
 * B2: Gọi api
 * B2.1: Hiển thị thanh tiến trình (loading)
 * B3: Kiểm tra status code
 * Nếu thành công ...
 * Nếu thất bại ...
 * B4: Tắt loading
 * B5: Thực thi các công việc tiếp theo
 */

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK); // Khi FETCH_TASK được dispatch => code từ đây trở xuống sẽ chạy
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      yield put(fetchListTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILLTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
}
export default rootSaga;
