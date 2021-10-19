const express = require("express");

const router = express.Router();
const { sendToDialogFlow } = require("./Helpers/FuncionesDF");

router.get("/", function (req, res) {
  res.send("Hello World");
});

router.post("/recivemsg", express.json(), async function (req, res) {
  let {msg,gpn,source}= req.body[0];

 console.log(msg,gpn,source);
  let resDF = await sendToDialogFlow(msg,gpn,source,"");

  console.log(resDF);
  
  res.send(resDF).status(200) 
});


module.exports = router;