const { AsignarPerfil } = require("../../Querys-BD/Qerys/Usuarios");
const { Now } = require("../../Utility/FechaLocal");
const { ValidadorResSql } = require("./ValidadorRespuestaSQL");

let asignarperfiladministrador = async(perfiladm, gpn) =>{
    let { id, error } = await AsignarPerfil(perfiladm, gpn,Now());
   
    let mensaje = `La actualizacion del usuario con el gpn:${gpn}, fue realizada de forma exitosa `;
    return ValidadorResSql(id,error,mensaje)

  }
module.exports = { asignarperfiladministrador };