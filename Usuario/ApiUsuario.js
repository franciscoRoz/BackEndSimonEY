const { Express } = require("actions-on-google/dist/framework/express");
const express = require("express");
const {
  infousuario,
  validarusuario,
  obteneridpermiso,
  existeusuario,
  insertarusuario,
  actualizarclave,
} = require("../Querys-BD/Qerys/Usuarios");

const router = express.Router();

router.get("/info/:id", express.json(), async function (req, res) {
  try {
    let { id } = req.params;

    let info = await infousuario(id);

    enviarinfo(info, "Correo no encontrado, inténtelo más tarde", res);
  } catch {
    res
      .send(
        "Error al consultar la información del usuario validar el correo ingresado"
      )
      .status(400);
  }
});

router.post("/validarusuario", express.json(), async function (req, res) {
  try {
    
    let { email, pass } = req.body[0];
    console.log(email,pass);
    console.log("resqery");
    let resqery = await validarusuario(email, pass);
    console.log(resqery);
    enviarinfo(resqery, "Correo o contraseña no válidos", res);
  } catch {
    res
      .send(
        "Error al consultar la información del usuario, validar el correo ingresado"
      )
      .status(400);
  }
});

router.post("/crearusuario", express.json(), async function (req, res) {
  try {
    let { gpn, email, clave, nombre, apellido } = req.body[0];

    let validaruser = await existeusuario(gpn);

    validaruser !== "" ? res.send("Usuario ya registrado").status(400) : null;

    let idpermiso = await obteneridpermiso("usuario");

    idpermiso === ""
      ? res
          .send("Ha ocurrido un error al crear el usuario, inténtelo más tarde")
          .status(400)
      : null;

    let crearusuario = await insertarusuario(
      gpn,
      email,
      clave,
      nombre,
      apellido,
      idpermiso.idpermiso
    );

    validaruser = await existeusuario(gpn);

    validaruser !== ""
      ? res.send("OK").status(200)
      : res
          .send("Ha ocurrido un error al crear el usuario, inténtelo más tarde")
          .status(400);
  } catch {
    res
      .send("Ha ocurrido un error al crear el usuario, inténtelo más tarde1")
      .status(400);
  }
});

router.post("/cambiarclave", express.json(), async function (req, res) {
  let { gpn, email, clave, nuevaclave } = req.body[0];

  let validacionclave = await validarusuario(email, clave);

  validacionclave === "" ? res.send("clave no valida").status(400) : null;

  let actualizarcontraseña = await actualizarclave(
    gpn,
    clave,
    email,
    nuevaclave
  );

  validacionclave = await validarusuario(email, nuevaclave);

  validacionclave === ""
    ? res
        .send(
          "Error en cambio de clave ,en caso de de algun problema porfavor contactar a su consulour"
        )
        .status(400)
    : res.send("OK").status(200);
});
let enviarinfo = (resqery, err, res) => {
  resqery == "" ? res.send(err).status(400) : res.send(resqery).status(200);
};
module.exports = router;
