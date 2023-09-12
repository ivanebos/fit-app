const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//get all workouts
router.get("/", getWorkouts);

//get single workouts
router.get("/:id", getWorkout);

//post new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//post new workout
router.patch("/:id", updateWorkout);

module.exports = router;
