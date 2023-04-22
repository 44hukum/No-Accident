const mongoose = require("mongoose");
const inquerySchema = new mongoose.Schema(
  {
   name:{
        type:String
    },
    email: {
      type: String,
    },
    details:{
        type: String,
    },
    status:{
      type: String,
      enum:['viewed','not-viewed'],
      default:'not-viewed'
    }
    },
  { timestamps: true }
);

module.exports = mongoose.model("Inquery", inquerySchema);
