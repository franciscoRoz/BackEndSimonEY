const express = require("express");
const app = express();
const router = express.Router();
const { sendToDialogFlow } = require("./DialogFlow/DialogFlow");

app.get("/", function (req, res) {
  res.send("Hello World");
});

router.post("/webhook", express.json(), function (req, res) {

  [msg,gpn,source]= req.body;

  console.log(msg,gpn,source);
  let resDF = sendToDialogFlow(msg,gpn,source,undefined);

  res.send(resDF).status(200) 
});

let port = 3000;
router.listen(port, () => {
  console.log("Estamos ejecutando el servidor en el puerto " + port);
});