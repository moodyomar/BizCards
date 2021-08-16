const express = require("express");
const bcrypt = require("bcrypt");
const {authToken} = require("../middlewares/auth");
const {pick} = require("lodash")

const {CardModel} = require("../models/cardsModel");
const { validUser, UserModel , validLogin , getToken, validCardsArray } = require("../models/userModel");



const router = express.Router();

router.get("/",async(req,res) => {
  res.json({msg:"users work"})
})

router.get("/userInfo", authToken ,async(req,res) => {
  try{
    let data = await UserModel.findOne({_id:req.tokenData._id},{password:0});
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})

// check if the token is valid and return status ok
router.get("/authUser", authToken , (req,res) => {
  res.json({status:"ok"})
})

router.get("/userCardsFav", authToken , async(req,res) => {
  try{
    let user = await UserModel.findOne({_id:req.tokenData._id});
    let cards_ar = user.cards;
    let userCards = await CardModel.find({bizNumber: { $in:cards_ar}})
    res.json(userCards);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})


router.patch("/cards", authToken, async(req,res) => {
  let validBody = validCardsArray(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let data = await UserModel.updateOne({_id:req.tokenData._id}, req.body);
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})

router.post("/",async(req,res) => {
  let validBody = validUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);

    // מצפין את הסיסמא ברמה של 10 
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    res.status(201).json(pick(user,["name","email","_id","createdAt"]));
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({err:"User/Email already in system! try to log in",code:11000})
    }
    console.log(err)
    res.status(400).json(err)
  }
})

router.post("/login",async(req,res) => {
  let validBody = validLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(401).json("User or password not found 1");
    }
    let validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(401).json("User or password not found 2");
    }
    let newToken = getToken(user._id)
    res.json({token:newToken});

  }
  catch(err){
 
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;