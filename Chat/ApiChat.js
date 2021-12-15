const { sendToDialogFlow } = require("./DialogFlow");
const express = require("express");
const { insertarmensaje, obtenermensajes } = require("../Querys-BD/Qerys/ChatQeryFuncion/Chat");
const { Now } = require("../Utility/FechaLocal.js");
const router = express.Router();
router.post("/enviarmensaje", express.json(), async function (req, res) {
  let { msg, gpn, source ,fecha,expense,gtime,permisos} = req.body[0];
  let respuestainsertdato = await insertarmensaje(gpn, msg, fecha,source);

  respuestainsertdato === ""
    ? null
    : res.send("No se pudo enviar tu mensaje, intentalo mas tarde").status(400);

  let respuesta_DialogFlow = await sendToDialogFlow(permisos,msg, gpn, source, "",gtime,expense);
  
  respuestainsertdato = await insertarmensaje(gpn, respuesta_DialogFlow.text, Now(),"robot");

  respuestainsertdato === ""
  ? null 
  : res.send("No se pudo enviar tu mensaje, intentalo mas tarde").status(400);

  res.send(respuesta_DialogFlow).status(200);
});

router.post("/respaldarmensaje", express.json(), async function (req, res) {
  let { mensaje, gpn, fecha,usuario } = req.body[0];

  let respuestainsertdato = await insertarmensaje(gpn, mensaje, fecha,usuario);

  respuestainsertdato === ""
    ? res.send("ok").status(200)
    : res.send("*no se pudo enviar tu mensaje").status(400);
});

router.get("/obtenerhistorico/:gpn", express.json(), async function (req, res) {
  let { gpn } = req.params;

  let Mensajeshistoricos = await obtenermensajes(gpn);
  console.log(Mensajeshistoricos);
  Mensajeshistoricos !== ""
    ? res.send(Mensajeshistoricos).status(200)
    : res.send({}).status(400);
});

module.exports = router;
