const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secretData")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  biz: Boolean,
  createdAt: {
    type: Date, default: Date.now()
  },
  // הולך לשמור בתוך המאפיין קארדס את כל הכרטיסים שהמשתמש עשה להם
  //  פייבוריט
  cards: Array
});

exports.UserModel = mongoose.model("users", userSchema);

// מייצר טוקן 
exports.getToken = (_userId) => {
  let token = jwt.sign({ _id: _userId }, config.jwtSecret, { expiresIn: "60mins" });
  return token;
}

exports.validUser = (_dataBody) => {
  let joiSchema = Joi.object({
    biz: Joi.boolean().required(),
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(2).max(99).required()
  })

  return joiSchema.validate(_dataBody)
}
exports.validLogin = (_dataBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(2).max(99).required()
  })

  return joiSchema.validate(_dataBody)
}


exports.validCardsArray = (_dataBody) => {
  let joiSchema = Joi.object({
    cards: Joi.array().min(0).required()
  })

  return joiSchema.validate(_dataBody)
}

