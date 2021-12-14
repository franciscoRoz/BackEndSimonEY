const { ActualizarRegcl } = require("./Funciones/ActualizarRegcl");
const { insertarRegrd } = require("./Funciones/InsertarRegrd");
const { InsertarCopiaRegcl } = require("./Funciones/InsertarCopiaRegcl");
const { InsertarRegcl } = require("./Funciones/InsertarRegcl");
const { ejecutarobtenerid } = require("./Funciones/ObtenerID");

let agregarsolicitud = async (text, gpn, gtime, expense) => {
  switch (text) {
    case "hacergtime":
      //Proceso de obtencion de item en BBDD
      let idsolicitudregistrada = ejecutarobtenerid(gtime, gpn);
      if (idsolicitudregistrada === undefined) {
        //Proceso de insercion de nuevo registro de solicitud carga laboral
        return await InsertarRegcl(gpn, gtime);
      } else {
        //Proceso de actualizacion de solicitud de carga laboral ya existente en BDD
        return await ActualizarRegcl(gpn, gtime, idsolicitudregistrada);
      }

    case "registrarexpense":
      //Proceso de insercion de solicitud de reembolso en BBDD
      return await insertarRegrd(expense, gpn);
    case "copiar Gtme":
       //Proceso de obtencion de item en BBDD
      let idreferencia = await ejecutarobtenerid(gtime, gpn);
      //Proceso de insercion de copia de la ultima solicitud de carga laboral del usuario
      return await InsertarCopiaRegcl(gpn, idreferencia);
    default:
      return text;
  }
};

module.exports = { agregarsolicitud };
