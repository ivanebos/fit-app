//Import
const express = require("express");
const {
  getLogs,
  getLog,
  createLog,
  deleteLog,
  updateLog,
} = require("../controllers/routineLogController");

//Middle ware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//middleware
router.use(requireAuth);

//get all logs
router.get("/", getLogs);

//get logs for bettwen 2 dates
router.get("/:from/:to", getLog);

//post new log
router.post("/", createLog);

//delete a log
router.delete("/:id", deleteLog);

//post new log
router.patch("/:id", updateLog);

module.exports = router;
