const { ejecutarqery } = require("../../dboperaciones");
let insertreembolsodinero = async (gpn,expense,idsemana) => {
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

  module.exports = { insertreembolsodinero};
  