const Task = require("../model/TasksModel");

module.exports = async (_id) => {
  try {
    await Task.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    return false;
  }
};
