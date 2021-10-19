const { sendToDialogFlow } = require("../DialogFlow");
const express = require("express");
const router = express.Router();
const request = require("request");
router.post("/Enviarmensaje", express.json(), function (req, res) {

    [msg,gpn,source]= req.body;
  
  
    let resDF = sendToDialogFlow(msg,gpn,source,undefined);
  
    res.send(resDF).status(200) 
  });
  router.get("/", function (req, res) {
    res.send("Todo Funcionando en funciones");
  });
  