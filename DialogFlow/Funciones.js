const { sendToDialogFlow } = require("./Helpers/DialogFlow");
const express = require("express");
const router = express.Router();
const request = require("request");
const uuid = require("uuid");
const axios = require("axios");
router.post("/enviarmensaje", express.json(), async function (req, res) {
  let {msg,gpn,source}= req.body[0];

  let resDF = await sendToDialogFlow(msg,gpn,source,"");

  const {text} = resDF.fulfillmentMessages[0].text

  res.send(text).status(200) 
});
  module.exports = router;