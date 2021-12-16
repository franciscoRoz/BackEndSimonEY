const { eliminarregistro } = require("../../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");

let EliminarRegcl = async(gtime,gpn)=>{
    let { id, error } = await eliminarregistro(gtime,gpn);
    let mensaje ="Su solicitud de eliminacion de registro fue ingresada de forma exitosa, si no recibes alguna respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro";
    return ValidadorResSql(id,error,mensaje)
}
module.exports = { EliminarRegcl };