const { ejecutarqery } = require("../dboperaciones");

let infousuario = async (email) => {
  try {
    let res = await ejecutarqery(`
        SELECT TOP (1) gpn,email,nombre,apellido,estado,tipopermiso 
        FROM [dbo].[USUARIO]
        LEFT JOIN [dbo].[TIPO_PERMISO] 
        ON USUARIO.idpermiso=TIPO_PERMISO.idpermiso
        WHERE email = '${email}'`);
    return evaluarespuesta(res[0][0]);
  } catch {
    console.log(`Error al obtener la información del usuario: ${email}`);
  }
};

let validarusuario = async (email, pass) => {
  try {
    let res = await ejecutarqery(`
        SELECT TOP (1) gpn,email,nombre,apellido,estado,tipopermiso 
        FROM [dbo].[USUARIO] 
        LEFT JOIN [dbo].[TIPO_PERMISO] 
        ON USUARIO.idpermiso=TIPO_PERMISO.idpermiso
        WHERE email = '${email}' and PWDCOMPARE('${pass}', clave)= 1`);

    return evaluarespuesta(res[0][0]);
  } catch {
    console.log("error al validar el usuario");
  }
};

let insertarusuario = async (
  gpn,
  email,
  clave,
  nombre,
  apellido,
  idpermiso
) => {
  try {
    await ejecutarqery(`
      INSERT INTO [dbo].[USUARIO]
      ([gpn]
      ,[email]
      ,[clave]
      ,[nombre]
      ,[apellido]
      ,[estado]
      ,[idpermiso])
VALUES
      ('${gpn}'
      ,'${email}'
      ,PWDENCRYPT('${clave}')
      ,'${nombre}'
      ,'${apellido}'
      ,'activo'
      ,${idpermiso})`);

    return "";
  } catch {
    console.log("error al registrar el usuario");
  }
};

let obteneridpermiso = async (permiso) => {
  try {
    let res = await ejecutarqery(`
        SELECT TOP (1) [idpermiso]
        FROM [dbo].[TIPO_PERMISO]
        where tipopermiso='${permiso}'`);
    return evaluarespuesta(res[0][0]);
  } catch {
    console.log(`No se encontró el permiso ${permiso}`);
  }
};

let existeusuario = async (gpn) => {
  try {
    let res = await ejecutarqery(`
        SELECT TOP (1) gpn,email,nombre,apellido,estado,tipopermiso 
        FROM [dbo].[USUARIO]
        LEFT JOIN [dbo].[TIPO_PERMISO] 
        ON USUARIO.idpermiso=TIPO_PERMISO.idpermiso
        WHERE gpn = '${gpn}'`);
    return evaluarespuesta(res[0][0]);
  } catch {
    console.log(`Error al obtener la información del usuario: ${email}`);
  }
};

let actualizarclave = async (gpn, clave, email, nuevaclave) => {
  try {
    await ejecutarqery(`
    UPDATE [dbo].[USUARIO]
    SET [clave] = PWDENCRYPT('${nuevaclave}')
    WHERE email='${email}' 
    and gpn='${gpn}' 
    and PWDCOMPARE('${clave}', clave)= 1`);
  } catch {
    console.log(
      `error al ejecutar la actualizacion de clave del usuario: ${email}`
    );
  }
};
let actualizarestadouser = async (email)=>{
  try {
    let res = await ejecutarqery(`
    UPDATE [dbo].[USUARIO]
    SET [estado] = 'activo'
    WHERE email='${email}'`);

    console.log(res);
  } catch {
    console.log(
      `error al ejecutar la actualizacion de clave del usuario: ${email}`
    );
  }
}
let obtenercorreo = async (gpn)=>{
  try {
    let res = await ejecutarqery(`
        SELECT TOP (1) email 
        FROM [dbo].[USUARIO]
        WHERE gpn = '${gpn}'`);
    return evaluarespuesta(res[0][0]);
    
  } catch {
    console.log(
      `error al ejecutar la actualizacion de clave del usuario: ${email}`
    );
  }
}
let actualizarclaverecuperada = async (gpn, email, nuevaclave) => {
  try {
    await ejecutarqery(`
    UPDATE [dbo].[USUARIO]
    SET [clave] = PWDENCRYPT('${nuevaclave}')
    WHERE email='${email}' 
    and gpn='${gpn}'`);
  } catch {
    console.log(
      `error al ejecutar la actualizacion de clave del usuario: ${email}`
    );
  }
};

let evaluarespuesta = (res) => {
  if (res === undefined) {
    return "";
  } else {
    return res;
  }
};

module.exports = {
  infousuario,
  validarusuario,
  obteneridpermiso,
  insertarusuario,
  existeusuario,
  actualizarclave,
  actualizarestadouser,
  obtenercorreo,
  actualizarclaverecuperada
};
