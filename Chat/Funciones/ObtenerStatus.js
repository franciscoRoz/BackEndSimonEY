const {Obtenerstatus } = require("../../Querys-BD/Qerys/ChatQeryFuncion/ReembolsoDinero");

let obtenerestadosolicitud = async(idsolicitud) =>{
    let {estadosolicitud} = await Obtenerstatus(idsolicitud);
   
   
    return `El estado de la solicitud número ${idsolicitud} es: ${estadosolicitud}`

  }
module.exports = { obtenerestadosolicitud };