const { Now } = require("../../../Utility/FechaLocal");
const { ejecutarqery } = require("../../dboperaciones");
let insertsolicitudcargalaboral = async (gpn, gtime) => {
  try {
    let { Engagement, Fecha, Lunes, Martes, Miercoles, Jueves, Viernes } =
      gtime;

    let IdpeticionRPA = await ejecutarqery(
      `declare @parametro1 int,@parametro2 varchar(30)
        exec Insertar_Solicitud_Carga_Laboral 
        '${gpn}'
        ,'${Engagement}'
        ,'${Fecha}'
        ,${Lunes}
        ,${Martes}
        ,${Miercoles}
        ,${Jueves}
        ,${Viernes}
        ,@parametro1 output,@parametro2 output`
    );

    return IdpeticionRPA[0][0];
  } catch (e) {
    console.log("error al registrar la solicitud", e);
  }
};

let actualizarcargalaboral = async (gpn, gtime, id) => {
  try {
    let { Engagement, Fecha, Lunes, Martes, Miercoles, Jueves, Viernes } =
      gtime;
    let IdpeticionRPA = await ejecutarqery(
      `declare @parametro1 int,@parametro2 varchar(30)
        exec Actualizar_Solicitud_Carga_Laboral 
        ${id}
        ,'${gpn}'
        ,'${Engagement}'
        ,'${Fecha}'
        ,${Lunes}
        ,${Martes}
        ,${Miercoles}
        ,${Jueves}
        ,${Viernes}
        ,@parametro1 output,@parametro2 output`
    );

    return IdpeticionRPA[0][0];
  } catch (error) {
    console.log(error);
  }
};
let eliminarregistro = async ({ Fecha }, gpn) => {
  try {
    let IdpeticionRPA = await ejecutarqery(
      `declare @parametro1 int,@parametro2 varchar(30)
      exec Eliminar_Solicitud_Carga_Laboral 
      '${gpn}'
      ,'${Fecha}'
      ,@parametro1 output,@parametro2 output`
    );

     console.log(IdpeticionRPA[0][0]);
    return IdpeticionRPA[0][0];
  } catch (error) {
    console.log(error);
  }
};

let copiaregistrocargalaboral = async (gpn, id) => {
  try {
    let IdpeticionRPA = await ejecutarqery(
      `declare @parametro1 int,@parametro2 varchar(30)
        exec Copiar_Solicitud_Carga_Laboral 
        ${id}
        ,'${Now()}'
        ,'${gpn}'
        ,@parametro1 output,@parametro2 output`
    );

    return IdpeticionRPA[0][0];
  } catch (error) {
    console.log(error);
  }
};

let obtenerid = async (idsemana, gpn) => {
  try {
    let idsolicitud = await ejecutarqery(
      `SELECT TOP(1) [idsolicitud]
      FROM [dbo].[SOLICITUD_REGISTRO_CARGA_LABORAL]
      where fechaingreso = '${idsemana}'and gpn='${gpn}' 
      ORDER BY [idsolicitud] DESC`
    );

    return idsolicitud[0][0];
  } catch {
    console.log("error al obtener el id");
  }
};

let obtenerncasos = async (fecha) => {
  try {
    let idsolicitud = await ejecutarqery(
      `exec Obtener_Solicitudes_Diarias '${fecha}'`
    );

    return idsolicitud[0][0];
  } catch {
    console.log("error al obtener el numero de casos");
  }
};

module.exports = {
  insertsolicitudcargalaboral,
  obtenerid,
  actualizarcargalaboral,
  copiaregistrocargalaboral,
  eliminarregistro,
  obtenerncasos,
};
