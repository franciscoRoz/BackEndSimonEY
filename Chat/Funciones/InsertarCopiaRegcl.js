const {  copiaregistrocargalaboral } = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");
const { ValidadorResSql } = require("./ValidadorRespuestaSQL");

let InsertarCopiaRegcl = async (gpn,{idsolicitud}) => {
  
 
  let {id,error} = await copiaregistrocargalaboral(gpn,idsolicitud);
  let mensaje = `Se copio el ultimo registro ingresado, recuerda que los dias feriados son manejados de forma interna por el robot y si no recibes respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro`;
  return ValidadorResSql(id,error,mensaje)

};
module.exports = { InsertarCopiaRegcl };
