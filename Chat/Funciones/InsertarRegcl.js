const { insertsolicitudcargalaboral } = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");
const { ValidadorResSql } = require("./ValidadorRespuestaSQL");

let InsertarRegcl = async(gpn,gtime)=>{
    let { id, error } = await insertsolicitudcargalaboral(gpn, gtime);
  
    let mensaje = "Su solicitud fue ingresada de forma exitosa, si no recibes alguna respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro";

    return ValidadorResSql(id,error,mensaje)
  }
module.exports = { InsertarRegcl };