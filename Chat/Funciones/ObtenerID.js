const {obtenerid,} = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");

let ejecutarobtenerid = async ({ Fecha }, gpn) => {
    return await obtenerid(Fecha, gpn);
};
module.exports = { ejecutarobtenerid };
