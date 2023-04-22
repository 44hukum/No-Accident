const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    details: 
      {
        type: String
      },
      status:{
          type: String,
          enum:['viewed','not_viewed'],
          default:'not_viewed',

      },
     time_stamp: {
      type: Date,
      default: Date.now,
    }, 
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationSchema);
