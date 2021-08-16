const express = require("express");
const { CardModel, validCard, genBizNumber } = require("../models/cardsModel");
const { authToken, checkIfBiz } = require("../middlewares/auth")
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let perPage = (req.query.perPage) ? Number(req.query.perPage) : 6;
    let page = (req.query.page) ? Number(req.query.page) : 0;
    let sort = (req.query.sort) ? req.query.sort : "_id";
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    let data = await CardModel.find({})
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });
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
    card.user_id = req.tokenData._id;
    card.bizNumber = await genBizNumber(CardModel);
    await card.save();
    res.status(201).json(card);
  }
  catch (err) {
    console.log('error');

    res.status(400).json(err);
  }
})

router.delete("/:idDel", authToken, async (req, res) => {
  let idDel = req.params.idDel;
  try {

    let data = await CardModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
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
    let data = await CardModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;