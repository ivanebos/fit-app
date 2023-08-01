const express = require("express");
const router = express.Router();

//get all workouts
router.get("/", (req, res) => {
  res.json({ mssg: "get all workouts" });
});

//get single workouts
router.get("/:id", (req, res) => {
  res.json({ mssg: "get workout" });
});

//post new workout
router.post("/", (req, res) => {
  res.json({ mssg: "post new workout" });
});

//delete a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete a workout" });
});

//post new workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "update a workout" });
});

module.exports = router;
