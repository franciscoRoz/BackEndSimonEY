const { Now } = require("../../../Utility/FechaLocal");
const { ejecutarqery } = require("../../dboperaciones");
let insertreembolsodinero = async (expense, gpn) => {
  try {
    let {
      Descripciondevolucion,
      Engagementdevolucion,
      Montodevolucion,
      imagen1,
      imagen2,
    } = expense;

    let IdpeticionRPA =
      await ejecutarqery(`declare @parametro1 int,@parametro2 varchar(30)
        exec Insertar_Solicitud_Reembolso 
        ${Montodevolucion},'${Engagementdevolucion}','${Descripciondevolucion}','${Now()}','${gpn}','${imagen1}','${imagen2}',@parametro1 output,@parametro2 output`);

    return IdpeticionRPA[0][0];
  } catch (e) {
    console.log("error al registrar la solicitud", e);
  }
};
let Obtenerstatus = async (idsolicitud) => {
  try {
    let IdpeticionRPA = await ejecutarqery(`SELECT [estadosolicitud]
      FROM [dbo].[PETICIONRPA]
      where idpeticion = '${idsolicitud}'`);
    console.log(`SELECT [estadosolicitud]
    FROM [dbo].[PETICIONRPA]
    where idpeticion = '${idsolicitud}'`);
    return IdpeticionRPA[0][0];
  } catch (e) {
    console.log("error al registrar la solicitud", e);
  }
};
module.exports = { insertreembolsodinero,Obtenerstatus };
