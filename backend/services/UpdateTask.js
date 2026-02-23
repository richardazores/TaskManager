const Task = require("../model/TasksModel");

module.exports = async (_id, set) => {
  try {
    await Task.updateMany({ _id }, set);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
