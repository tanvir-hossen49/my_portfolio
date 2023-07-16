const skillModel = require("../models/skillModel");
const createError = require("http-errors");

const getSkills = async (_req, res, next) => {
  try {
    const skill = await skillModel.find();

    if (typeof skill !== "undefined" && skill.length === 0) {
      throw createError(404, "skill not found");
    }

    return res.status(200).send(skill);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
};
