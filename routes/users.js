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
    // pulling userdata based on the id after we recived the token
    //{password:0} supposed to show all props besides password
    // req.decodeToken - come from the middleware auth - line 13
    let data = await UserModel.findOne({_id:req.tokenData._id},{password:0});
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})

// check if the token is valid & return status ok
router.get("/authUser", authToken , (req,res) => {
  res.json({status:"ok"})
})

// pull all the cards that the users likes/favorite them
// There will be a double request here too first we will pull the array from the user & then we will talk to the card model & pull out all the cards that their biz num matches to their records
router.get("/userCardsFav", authToken , async(req,res) => {
  try{
    // First pull out the array of card numbers
    let user = await UserModel.findOne({_id:req.tokenData._id});
    // cards_ar -> ["0000","11111","22222"] example of what we recived from above line
    let cards_ar = user.cards;
    // Then remove from the cards' collection only the cards in the array that we pulled out in the previous rows
    let userCards = await CardModel.find({bizNumber: { $in:cards_ar}})
    res.json(userCards);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})


// Updates the cards that the user has made them favorites
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

// adding a new user
router.post("/",async(req,res) => {
  let validBody = validUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);

    // Encrypts the password at the level of 10
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
    // check if there is a user with such an email at all
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      // return error message if !user
      return res.status(401).json("User or password not found 1");
    }
    // console.log(user)
    // validate password
    let validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(401).json("User or password not found 2");
    }
    // generate token
    let newToken = getToken(user._id)
    res.json({token:newToken});

  }
  catch(err){
 
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;