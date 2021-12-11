const {insertsolicitudcargalaboral,obtenerid,} = require("../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");
const {insertreembolsodinero,} = require("../Querys-BD/Qerys/ChatQeryFuncion/ReembolsoDinero");

let agregarsolicitud = async (text, gpn, gtime, expense) => {
  let { Engagement, Fecha, Lunes, Martes, Miercoles, Jueves, Viernes } = gtime;

  switch (text) {
    case "hacergtime":
      let idsolicitudregistrada = await obtenerid(Fecha, gpn);
      if (idsolicitudregistrada === undefined) {
        let { id, error } = await insertsolicitudcargalaboral(gpn, gtime);
        if (error !== "" && id !== "") {
          return error;
        }
        return "Su solicitud fue ingresada de forma exitosa, si no recibes alguna respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro";
      } else {
        // update de la solicitud
        console.log("update de la solicitud");
      }

    case "registrarexpense":
      let { id, error } = await insertreembolsodinero(expense, gpn);
      console.log(id, error);
      if (error !== "" && id !== "") {
        return error;
      }
      return `Su solicitud fue ingresada de forma exitosa, Puedes consultar el estado de tu solicitud puedes consultar con el sigiente numero de solicitud:N${id}`
    default:
      break;
  }
};

module.exports = { agregarsolicitud };
