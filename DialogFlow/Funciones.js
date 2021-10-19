const { sendToDialogFlow } = require("./Helpers/DialogFlow");
const express = require("express");
const router = express.Router();
const request = require("request");
const uuid = require("uuid");
const axios = require("axios");
router.post("/enviarmensaje", express.json(), async function (req, res) {
  let {msg,gpn,source}= req.body[0];

 console.log(msg,gpn,source);
  let resDF = await sendToDialogFlow(msg,gpn,source,"");

  console.log(resDF);
  
  res.send(resDF).status(200) 
});
  module.exports = router;