const Joi = require('joi');

const groupNameSchema = { groupName: Joi.string().max(30).alphanum() };

module.exports = (req, res, next) => {
  const { error } = Joi.validate(req.body, groupNameSchema);

  if (error) {
    return res.status(400).send(error);
  }

  return next();
};
