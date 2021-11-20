const express = require("express");

const router = express.Router();

const {
  getinfousuario,
  validarusuarios,
  crearusuario,
  cambiarclave,
  activarusuario,
  recuperarclave,
  enviarcorreoactivacion,
} = require("./FuncionesUsuario");



router.get("/info/:id", express.json(), async function (req, res) {
  let { id } = req.params;

  let { codigo, mensaje } = await getinfousuario(id);
  
  
  res.send(mensaje).status(codigo);
});

router.post("/validarusuario", express.json(), async function (req, res) {
  let { email, pass } = req.body[0];

  let { codigo, mensaje } = await validarusuarios(email, pass);

  res.send(mensaje).status(codigo);
});

router.post("/crearusuario", express.json(), async function (req, res) {
  let { gpn, email, clave, nombre, apellido } = req.body[0];

  let { codigo, mensaje } = await crearusuario(
    gpn,
    email,
    clave,
    nombre,
    apellido
  );

  res.send(mensaje).status(codigo);
});

router.post("/cambiarclave", express.json(), async function (req, res) {
  let { gpn, email, clave, nuevaclave } = req.body[0];

  let { codigo, mensaje } = await cambiarclave(gpn, email, clave, nuevaclave);

  res.send(mensaje).status(codigo);
});

router.post("/enviarcorreo", express.json(), async function (req, res) {
  let { email } = req.body[0];
  let { codigo, mensaje } = await enviarcorreoactivacion(email);

  res.send(mensaje).status(codigo);
});

router.post("/recuperarclave", express.json(), async function (req, res) {
  let { gpn } = req.body[0];

  let { codigo, mensaje } = await recuperarclave(gpn);

  res.send(mensaje).status(codigo);
});

router.post("/activarcuenta/:email", express.json(), async function (req, res) {
  let { email } = req.params;

  let { codigo, mensaje } = await activarusuario(email);

  res.send(mensaje).status(codigo);
});
module.exports = router;
