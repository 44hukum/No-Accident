const mongoose = require("mongoose");
const speedVoilationSchema = new mongoose.Schema(
  {
    voilation_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    speed:{
        type:String
    },
    time_stamp: {
      type: Date,
      default: Date.now,
    },
    device_id:{
        type:String,
        unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SpeedVoilation", speedVoilationSchema);
