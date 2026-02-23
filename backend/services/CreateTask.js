const Task = require("../model/TasksModel");

module.exports = async (
  title,
  description,
  status,
  dueDate,
  assignedTo,
  createdAt,
) => {
  try {
    await Task.insertMany({
      title,
      description,
      status,
      dueDate,
      assignedTo,
      createdAt,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
