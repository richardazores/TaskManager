const task = require("../model/TasksModel");

module.exports = async () => {
  try {
    const results = await task.find({});
    return results;
  } catch (error) {
    return false;
  }
};
