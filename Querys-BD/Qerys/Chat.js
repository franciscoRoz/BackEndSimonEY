const { ejecutarqery } = require("../dboperaciones");
let insertarmensaje = async (gpn, msg, fecha) => {
  try {
      console.log( `INSERT INTO [dbo].[CHAT] ([gpn],[fecha],[mensaje])
      VALUES('${gpn}','${fecha}','${msg}')`);
    await ejecutarqery(
      `INSERT INTO [dbo].[CHAT] ([gpn],[fecha],[mensaje])
        VALUES('${gpn}','${fecha}','${msg}')`
    );

    return "";
  } catch {
    console.log("error al cargar el mensaje");
  }
};
let obtenermensajes = async (gpn) => {
  try {
    let data=await ejecutarqery(
      `SELECT [gpn],[fecha],[mensaje] FROM [dbo].[CHAT] where gpn = '${gpn}'`
    );
      console.log(data[0]);
    return data[0];
  } catch {
    console.log("error al obtener los mensajes");
  }
};

module.exports = { insertarmensaje, obtenermensajes };
