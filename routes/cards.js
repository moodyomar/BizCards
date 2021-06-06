const express = require("express");
const { CardModel, validCard, genBizNumber } = require("../models/cardsModel");
const { authToken, checkIfBiz } = require("../middlewares/auth")
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let perPage = (req.query.perPage) ? Number(req.query.perPage) : 5;
    let page = (req.query.page) ? Number(req.query.page) : 0;
    // מגדיר לפי מה למיין
    let sort = (req.query.sort) ? req.query.sort : "_id";
    // מגדיר שאם מקבל ריוורס ייס יציג מהגדול לקטן ואם לא הפוך
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    let data = await CardModel.find({})
      .limit(perPage)
      .skip(page * perPage)
      // [sort] -> מביא את הקיי שהוא בתוך המשתנה של סורט ולא את הקיי סורט
      .sort({ [sort]: reverse });
    // .sort({_id:-1}) // ידאג שהרשומה האחרונה תוצג ראשונה
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
  // res.json({msg:"cards work"});
})


router.get("/single/:cardId", async (req, res) => {
  try {
    let cardId = req.params.cardId;
    let card = await CardModel.findOne({ _id: cardId });
    res.json(card);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.get("/totalCards", async (req, res) => {
  try {
    let data = await CardModel.countDocuments({});
    res.json({ count: data })
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

})

router.get("/userCardsAdded", authToken, async (req, res) => {
  try {
    let perPage = (req.query.perPage) ? Number(req.query.perPage) : 5;
    let page = (req.query.page) ? Number(req.query.page) : 0;
    let sort = (req.query.sort) ? req.query.sort : "_id";
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    let data = await CardModel.find({ user_id: req.tokenData._id })
      .limit(perPage)
      .skip(page * perPage)

      .sort({ [sort]: reverse });
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})


// add new card
router.post("/", authToken, checkIfBiz, async (req, res) => {
  let validBody = validCard(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // only user that is a biz = true can add card
    let card = new CardModel(req.body);
    // מוסיפים מאפיין של האיי די של המשתמש
    // לפני השמירה במסד
    card.user_id = req.tokenData._id;
    // נייצר מספר עסק מ 1 עד 999999
    card.bizNumber = await genBizNumber(CardModel);
    await card.save();
    res.status(201).json(card);
  }
  catch (err) {
    // console.log(err);
    console.log('error');

    res.status(400).json(err);
  }
})

router.delete("/:idDel", authToken, async (req, res) => {
  let idDel = req.params.idDel;
  try {
    // בשביל אבטחה אנחנו בודקים גם שאיי די שווה לפרמטר שקיבלנו מהיו אר אל
    // אבל גם בודקים שהרשומה היוזר איי די שלה שווה לאיי די שמוצפן בטוקן
    // שנשלח עם הבקשה
    let data = await CardModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
    // אם הצליח נקבל אן שווה 1
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.put("/:idEdit", authToken, async (req, res) => {
  let idEdit = req.params.idEdit
  let validBody = validCard(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // יוכל לערוך רק רשומה שהיוזר איי די שלה שווה למידע של האיי די 
    // שנשלח עם הטוקן
    let data = await CardModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body);
    // אם הצליח נקבל אן שווה 1
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;