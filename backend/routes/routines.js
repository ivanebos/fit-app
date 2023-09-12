const express = require("express");
const {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine,
  updateRoutine,
} = require("../controllers/routineController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
//middleware
router.use(requireAuth);

//get all routines
router.get("/", getRoutines);

//get single routine
router.get("/:id", getRoutine);

//post new routine
router.post("/", createRoutine);

//delete a routine
router.delete("/:id", deleteRoutine);

//post new routine
router.patch("/:id", updateRoutine);

module.exports = router;
