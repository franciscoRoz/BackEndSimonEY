const express = require("express");

const router = express.Router();
const { sendToDialogFlow } = require("./DialogFlow/DialogFlow");

router.get("/", function (req, res) {
  res.send("Hello World");
});

router.post("/webhook", express.json(), function (req, res) {

  [msg,gpn,source]= req.body;

 
  let resDF = sendToDialogFlow(msg,source,gpn,"");

  console.log(resDF);
  
  res.send(resDF).status(200) 
});


module.exports = router;