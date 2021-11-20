const { sendToDialogFlow } = require("./DialogFlow");
const express = require("express");
const { insertarmensaje, obtenermensajes } = require("../Querys-BD/Qerys/Chat");
const router = express.Router();
router.post("/enviarmensaje", express.json(), async function (req, res) {
  let { msg, gpn, source } = req.body[0];

  let resDF = await sendToDialogFlow(msg, gpn, source, "");

  const { text } = resDF.fulfillmentMessages[0].text;

  res.send(text).status(200);
});

router.post("/respaldarmensaje", express.json(), async function (req, res) {
  let { msg, gpn, fecha,usuario } = req.body[0];

  let respuestainsertdato = await insertarmensaje(gpn, msg, fecha,usuario);

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
