const { ejecutarqery } = require("../dboperaciones");
let insertarmensaje = async (gpn, msg, fecha,usuario) => {
  try {
      console.log(   `INSERT INTO [dbo].[CHAT] ([gpn],[fecha],[mensaje],[usuario])
      VALUES('${gpn}','${fecha}','${msg}','${usuario}')`);
    await ejecutarqery(
      `INSERT INTO [dbo].[CHAT] ([gpn],[fecha],[mensaje],[usuario])
        VALUES('${gpn}','${fecha}','${msg}','${usuario}')`
    );

    return "";
  } catch {
    console.log("error al cargar el mensaje");
  }
};
let obtenermensajes = async (gpn) => {
  try {
    console.log(`SELECT [gpn],[fecha],[mensaje],[usuario] FROM [dbo].[CHAT] where gpn = '${gpn}'`);
    let data=await ejecutarqery(
      `SELECT [gpn],[fecha],[mensaje],[usuario] FROM [dbo].[CHAT] where gpn = '${gpn}'`
    );
      console.log(data[0]);
    return data[0];
  } catch {
    console.log("error al obtener los mensajes");
  }
};

module.exports = { insertarmensaje, obtenermensajes };
