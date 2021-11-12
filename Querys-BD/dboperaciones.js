var sql = require("mssql");

var config = require('../Config/dboconfig.js')

// async function testconnection() {
//   try {
//     //se crea instancia de conexion asincrona con la base de datos registrada en el archivo de dbo config
//     let pool = await sql.connect(config);
//     //en caso de la conexion ser exitosa se notifica con un console log que la conexion fue establecida
//     console.log("conectado a sql");
//   } catch (error) {
//     //el error es tomado por el catch para ser notificado por un console log
//     console.log("error :" + error);
//   }
// }
async function ejecutarqery(Qery) {
  try {
    //se crea instancia de conexion asincrona con la base de datos registrada en el archivo de dbo config
    let pool = await sql.connect(config);
    //se crea una solicitud en la cual se envia la consulta sql para retornar lo obtenido con dicha consulta
    let res = await pool.request().query(Qery);
    //se cierra la instancia abierta de conexion a sql
    pool.close();
    //se retorna el resultado obtenido con la consulta sql realizada
    return res.recordsets;
  } catch (error) {
    //el error es tomado por el catch para ser notificado por un console log
    console.log("error :" + error);
  }
}
  
module.exports = {
  // testconnection: testconnection,
  ejecutarqery
};

