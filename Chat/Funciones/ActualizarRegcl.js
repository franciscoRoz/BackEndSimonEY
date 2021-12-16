const {actualizarcargalaboral} = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");
const { ValidadorResSql } = require("./ValidadorRespuestaSQL");

let ActualizarRegcl = async (gpn, gtime, { idsolicitud }) => {
  let { id, error } = await actualizarcargalaboral(gpn, gtime, idsolicitud);
  let mensaje =
    "Su solicitud de actualizacion fue ingresada de forma exitosa, si no recibes alguna respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro";
  return ValidadorResSql(id, error, mensaje);
};
module.exports = { ActualizarRegcl };
