import * as modalTypes from "../contants/modal";

export const showModal = () => ({
  type: modalTypes.SHOW_MODAL,
});
export const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});
export const changeModalTitle = (title) => ({
  type: modalTypes.CHANGE_MODEL_TITLE,
  payload: {
    title,
  },
});
export const changeModalContent = (component) => ({
  type: modalTypes.CHANGE_MODAL_CONTENT,
  payload: {
    component,
  },
});
