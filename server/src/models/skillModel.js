const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  level: {
    type: String,
    required: [true, "level is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
});

const skillModel = model("skill", skillSchema);

module.exports = skillModel;
