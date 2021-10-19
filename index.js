const express = require("express");
const app = express();
const { sendToDialogFlow } = require("./DialogFlow/DialogFlow");
const port = process.env.PORT || 3000;


app.get("/", function (req, res) {
  res.send("Todo Funcionando en index");
});

  // app.post("/webhookDF", express.json(), function (req, res) {

  //   [msg,gpn,source]= req.body;


  //   let resDF = sendToDialogFlow(msg,gpn,source,undefined);

  //   res.send(resDF).status(200) 
  // });
  app.use("/HandleMsj" ,  require("./DialogFlow/Helpers/Funciones"));

app.listen(port, () => {
  console.log("Estamos ejecutando el servidor en el puerto " + port);
});