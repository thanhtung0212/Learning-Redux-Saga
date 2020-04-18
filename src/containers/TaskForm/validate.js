const validate = (value) => {
  const error = {};
  const { title } = value;
  if (!title) {
    error.title = "Vui lòng nhập tiêu đề";
  } else if (title.trim() && title.length < 5) {
    error.title = "Tiêu đề phải hơn 5 kí tự";
  }
  return error;
};
export default validate;
