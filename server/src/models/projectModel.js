const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  features: {
    type: [String],
    required: [true, "features is required"],
  },
  role: {
    type: String,
    required: [true, "role is required"],
  },
  startDate: {
    type: Date,
    required: [true, "start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "end date is required"],
  },
  technologies: {
    type: [String],
    required: [true, "technologies is required"],
  },
  codeLink: {
    client: {
      type: String,
      required: [true, "technologies is required"],
    },
    server: {
      type: String,
    },
  },
  productionLink: {
    type: String,
    required: [true, "category is required"],
  },
});

const projectModel = model("projects", projectSchema);

module.exports = projectModel;
