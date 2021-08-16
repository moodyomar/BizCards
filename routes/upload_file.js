const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "upload" })
})

router.post("/", (req, res) => {
  console.log(req.files);
  // fileSend88 -> what is sent from client side
  // req.files -> new prop cuz of EXPRESS-fileupload in app.js
  let file = req.files ? req.files.fileSend99 : null;
  if (!file) {
    return res.status(400).json({ msg: "You need to send file!" })
  }
  if (file.size >= 5 * 1024 * 1024) {
    return res.status(400).json({ msg: "file too big, you can send file up to 5 mb" })
  }
  // check file extention
  file.ext = path.extname(file.name);
  let allowExts_ar = [".jpg", ".png", ".jpeg", ".gif"];
  // if(file.ext != ".jpg" ){
  if (!allowExts_ar.includes(file.ext)) {
    return res.status(400).json({ msg: "file must be jpg , png , jpeg or gif" })
  }

  file.mv("public/images/" + file.name, (err) => {
    if (err) { return res.status(500).json({ msg: "There problem please contact the admin, maybe he know what the problem" }) }
    res.json({ msg: "file uploaded",n:1 })
  })


})
module.exports = router;