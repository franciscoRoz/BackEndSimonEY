const { Now } = require("../../../Utility/FechaLocal");
const { ejecutarqery } = require("../../dboperaciones");
let insertsolicitudcargalaboral = async (gpn,gtime) => {
    try {
      let {Engagement,Fecha,Lunes,Martes,Miercoles,Jueves,Viernes} = gtime 
   
        let IdpeticionRPA = await ejecutarqery(`declare @parametro1 int,@parametro2 varchar(30)
        exec Insertar_Solicitud_Carga_Laboral 
        '${gpn}'
        ,'${Engagement}'
        ,'${Fecha}'
        ,${Lunes}
        ,${Martes}
        ,${Miercoles}
        ,${Jueves}
        ,${Viernes}
        ,@parametro1 output,@parametro2 output`)
        
      return IdpeticionRPA[0][0];
    } catch(e) {
      console.log("error al registrar la solicitud",e);
    } 
  };
  
  let actualizarcargalaboral = async (gpn,gtime,id) => {
    try {
      let {Engagement,Fecha,Lunes,Martes,Miercoles,Jueves,Viernes} = gtime 
      
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
        ,@parametro1 output,@parametro2 output`)
        
      return IdpeticionRPA[0][0];

    } catch (error) {
      
    }
  }

  let copiaregistrocargalaboral = async (gpn,id) => {
    try {
   
      console.log( `declare @parametro1 int,@parametro2 varchar(30)
        exec Copiar_Solicitud_Carga_Laboral 
        ${id}
        ,'${Now()}'
        ,'${gpn}'
        ,@parametro1 output,@parametro2 output`);
        
      let IdpeticionRPA = await ejecutarqery(
        `declare @parametro1 int,@parametro2 varchar(30)
        exec Copiar_Solicitud_Carga_Laboral 
        ${id}
        ,'${Now()}'
        ,'${gpn}'
        ,@parametro1 output,@parametro2 output`)
        
       
      return IdpeticionRPA[0][0];

    } catch (error) {
      console.log(error);
    }
  }

  let obtenerid = async (idsemana,gpn) => {
    try {
     
     let idsolicitud= await ejecutarqery(
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
 

  
  module.exports = { insertsolicitudcargalaboral,obtenerid,actualizarcargalaboral,copiaregistrocargalaboral};
  