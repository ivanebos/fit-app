const Log = require("../models/routineLogModel");
const mongoose = require("mongoose");
//get all workout
const getLogs = async (req, res) => {
  const user_id = req.user._id;
  const logs = await Log.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(logs);
};

//get all logs bettwen from and to dates
const getLog = async (req, res) => {
  const { from, to } = req.params;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const logs = await Log.find({
    date: {
      $gte: fromDate, // Greater than or equal to 'from' date
      $lte: toDate, // Less than or equal to 'to' date
    },
  });
  res.status(200).json(logs);
};

//create new log
const createLog = async (req, res) => {
  const { routine, date } = req.body;

  let emptyFields = [];

  if (!routine) {
    emptyFields.push("routine");
  }
  if (!date) {
    emptyFields.push("date");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const log = await Log.create({ routine, date, user_id });

    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a log
const deleteLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such log" });
  }
  const log = await Log.findOneAndDelete({ _id: id });

  if (!log) {
    return res.status(400).json({ error: "No such log" });
  }

  res.status(200).json(log);
};

//update a log
const updateLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const log = await Log.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!log) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(log);
};

module.exports = {
  getLogs,
  getLog,
  createLog,
  deleteLog,
  updateLog,
};
