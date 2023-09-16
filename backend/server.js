//Init env
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

//Import routes
const workoutRoutes = require("./routes/workouts");
const routineRoutes = require("./routes/routines");
const logRoutes = require("./routes/routineLogs");
const userRoutes = require("./routes/user");

//express
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for reqests
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB. Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("ERROR: ", error);
  });
