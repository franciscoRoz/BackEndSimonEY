const { obtenerncasos,} = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");
const { Now } = require("../../Utility/FechaLocal");

let ejecutarobtenerncasos = async () => {
    let {nsolicitudcl,nsolicitudrd} = await obtenerncasos(Now());

    return `Los casos procesados el dia de hoy corresponden a 
    solicitud de GT&E:${nsolicitudcl}
    solicitud de expense:${nsolicitudrd}`;
 

};
module.exports = { ejecutarobtenerncasos };