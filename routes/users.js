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
    // שאילתא של הוצאת מידע על היוזר לפי האיי די שאספנו מהטוקן
    //{password:0} אומר להציג את כל המאפיינים חוץ מאת הסיסמא
    // req.decodeToken - מגיע מהמידל וואר של האוט שורה 13
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

// ישלוף את כל הקלפים שהמשתמש עשה להם לייק/פייבופריט בבקשת פאץ
// תיהיה כאן בקשה כפולה גם קודם נשלוף את המערך מהמשתמש ולאחר מכן נדבר עם
// הקארד מודל ונשלוף את כל הקלפים שהספיר ביז מתאימים לרשומות שלהם
router.get("/userCardsFav", authToken , async(req,res) => {
  try{
    // קודם שולפים את המערך של המספרי כרטיסים
    let user = await UserModel.findOne({_id:req.tokenData._id});
    // cards_ar -> ["0000","11111","22222"] דוגמא מה קיבלנו מהבקשה בשורה למעלה
    let cards_ar = user.cards;
    // ואז שולפים מהקולקשן של הקארדס רק את הקלפים שנמצאים במערך ששלפנו
    // בשורות הקודמות
    let userCards = await CardModel.find({bizNumber: { $in:cards_ar}})
    res.json(userCards);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})


// מעדכן את הכרטיסים שהמשתמש עשה להם פייבוריט
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

// הוספת יוזר חדש
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
    // במקרה שלנו יכול להגיע לקץ' גם אם יש משתמש עם מייל 
    // כזה במערכת 
    if(err.code == 11000){
      return res.status(400).json({err:"User/Email already in system! try to log in",code:11000})
    }
    console.log(err)
    res.status(400).json(err)
  }
})

// בספר במקפוס שמים את הרואט הנל בקובץ שנקרא אוט
router.post("/login",async(req,res) => {
  let validBody = validLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    // בודקים אם בכלל יש משתמש עם מייל כזה
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      // מחזיר הודעת שגיאה שמשתמש לא נמצא
      return res.status(401).json("User or password not found 1");
    }
    // console.log(user)
    // בודק אם הסיסמא תקינה
    let validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(401).json("User or password not found 2");
    }
    // לייצר טוקן
    let newToken = getToken(user._id)
    res.json({token:newToken});

  }
  catch(err){
 
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;