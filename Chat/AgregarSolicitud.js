const {
  insertsolicitudcargalaboral,
  obtenerid,
} = require("../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral");

let agregarsolicitud = async (text, gpn, gtime, expense) => {
  let { Engagement, Fecha, Lunes, Martes, Miercoles, Jueves, Viernes } = gtime;
  let { Descripciondevolucion, Engagementdevolucion, Montodevolucion } =
    expense;

  switch (text) {
    case "hacergtime":
      let idsolicitudregistrada = await obtenerid(Fecha, gpn);
      if (idsolicitudregistrada === undefined) {
        let { id, error } = await insertsolicitudcargalaboral(gpn, gtime);
        if (error !== "" && id !=='') {
          return error;
        }
        return "Su solicitud fue ingresada de forma exitosa, si no recibes alguna respuesta en los próximos 30 minutos te recomendamos revisar de forma manual tu registro";
      } else {
        // update de la solicitud
        console.log("update de la solicitud");
      }

    case "registrarexpense":
        let {id,errror}=await insertreembolsodinero()
    default:
      break;
  }
};

module.exports = { agregarsolicitud };
