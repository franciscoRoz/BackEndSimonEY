const { ActualizarRegcl } = require("./Funciones/ActualizarRegcl");
const { insertarRegrd } = require("./Funciones/InsertarRegrd");
const { InsertarCopiaRegcl } = require("./Funciones/InsertarCopiaRegcl");
const { InsertarRegcl } = require("./Funciones/InsertarRegcl");
const { ejecutarobtenerid } = require("./Funciones/ObtenerID");
const { EliminarRegcl } = require("./Funciones/EliminarRegcl");
const { ejecutarobtenerncasos } = require("./Funciones/ObtenerNCasos");
const { obtenerestadosolicitud } = require("./Funciones/ObtenerStatus");
const { asignarperfiladministrador } = require("./Funciones/ActualizarPermisos");

let agregarsolicitud = async (text, gpn, gtime, expense, permisos,perfiladm,idsolicitud) => {
  switch (text) {
    case "hacergtime":
      //Proceso de obtencion de item en BBDD
      let idsolicitudregistrada = await ejecutarobtenerid(gtime, gpn);

      if (idsolicitudregistrada === undefined) {
        //Proceso de insercion de nuevo registro de solicitud carga laboral
        return await InsertarRegcl(gpn, gtime);
      } else {
        //Proceso de actualizacion de solicitud de carga laboral ya existente en BDD
        return await ActualizarRegcl(gpn, gtime, idsolicitudregistrada);
      }
    case "copiar Gtme":
      //Proceso de obtencion de item en BBDD
      let idreferencia = await ejecutarobtenerid(gtime, gpn);
      //Proceso de insercion de copia de la ultima solicitud de carga laboral del usuario
      return await InsertarCopiaRegcl(gpn, idreferencia);
    case "Realizareliminacion":
      //Proceso de eliminacion de registros de carga laboral
      return await EliminarRegcl(gtime, gpn);
    case "registrarexpense":
      //Proceso de insercion de solicitud de reembolso en BBDD
      return await insertarRegrd(expense, gpn);
    case "casosdiarios":
      if ("administrador" === permisos) {
        //Proceso encargado de extraer la cantidad de casos tanto de carga laboral como la de expense
        return await ejecutarobtenerncasos();
      }
    case 'AsignarPerfil':
      if ("administrador" === permisos) {
        console.log(perfiladm,gpn);
        //Proceso encargado de actualizar los permisos a los del administrador
        return await asignarperfiladministrador(perfiladm,gpn);
      }
    case 'ConsultarEstado':
      return await obtenerestadosolicitud(idsolicitud);
    default:

      return text;
  }
};

module.exports = { agregarsolicitud };
