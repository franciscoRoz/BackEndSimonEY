const { ejecutarqery } = require("../../dboperaciones");
let insertsolicitudcargalaboral = async (gpn,gtime,idsemana) => {
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
  let obtenerid = async (idsemana,gpn) => {
    try {
  
     let idsolicitud= await ejecutarqery(
        `SELECT [idsolicitud]
        FROM [dbo].[SOLICITUD_REGISTRO_CARGA_LABORAL]
        where idsemana_AAAA='${idsemana}'and gpn='${gpn}'`
      );
   
      return idsolicitud[0][0];
    } catch {
      console.log("error al obtener el id");
    }
  };
 

  
  module.exports = { insertsolicitudcargalaboral,obtenerid};
  