const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineLogSchema = new Schema(
  {
    routine: {
      type: String,
      required: true,

      //attach objs
      //type: Schema.Types.ObjectID,
      //ref: "Routine",
    },
    date: {
      type: Date,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoutineLog", routineLogSchema);
