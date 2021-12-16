const { insertreembolsodinero } = require("../../Querys-BD/Qerys/ChatQeryFuncion/ReembolsoDinero");
const { ValidadorResSql } = require("./ValidadorRespuestaSQL");

let insertarRegrd = async(expense, gpn) =>{
    let { id, error } = await insertreembolsodinero(expense, gpn);
   
    let mensaje = `Su solicitud fue ingresada de forma exitosa, Puedes consultar el estado de tu solicitud puedes consultar con el sigiente numero de solicitud:N${id}`;
    return ValidadorResSql(id,error,mensaje)

  }
module.exports = { insertarRegrd };