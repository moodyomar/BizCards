const jwt = require("jsonwebtoken");
const {config} = require("../config/secretData");
const { UserModel } = require("../models/userModel");



exports.authToken = (req,res,next) => {
  let validToken = req.header("x-auth-token");
  if(!validToken){
    return res.status(401).json({msg:"you must send token ! ,read the docs of the api !!!!"});
  }
  try{
    let decodeToken = jwt.verify(validToken,config.jwtSecret);
    // אנחנו מעבירים לריק את המשתנה כמאפיין
    // כדי שהפונקציות הבאות בשרשור של הראוט
    // יוכלו לקבל את המידע במקרה הזה האיי די של המשתמש
    req.tokenData = decodeToken;
    // הכל טוב אפשר לעבור לפונקציה הבאה
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({err:"token invalid or expired"});
  }
}

// מידל וואר שבדוק שהמשתמש הוא עסק
exports.checkIfBiz = async(req, res, next) => {
  try {
    let user = await UserModel.findOne({ _id:req.tokenData._id, biz: true });
    if (!user) {
      return res.status(401).json({ err: "User not biz" })
    }
    next();
  }
  catch (err) {
    console.log(err);
    res.status(401).json({ err: "there problem or user is not biz" });
  }
}