let {
  infousuario,
  validarusuario,
  obteneridpermiso,
  existeusuario,
  insertarusuario,
  actualizarclave,
  actualizarestadouser,
  obtenercorreo,
  actualizarclaverecuperada,
} = require("../Querys-BD/Qerys/Usuarios");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const {
  emailactivarcuenta,
  emailrecuperarclave,
} = require("../Utility/emails");

const { transporter } = require("../Config/confignodemiler.js");
const { generadorclaves } = require("../Utility/generarclave");
let getinfousuario = async (id) => {
  try {
    let info = await infousuario(id);
    console.log(info);
    return GRR(info, "Correo no encontrado, inténtelo más tarde");
  } catch {
    return {
      codigo: 400,
      mensaje:
        "Error al consultar la información del usuario validar el correo ingresado",
    };
  }
};

let validarusuarios = async (email, pass) => {
  try {
    let infovalidacion = await validarusuario(email, pass);
    console.log(infovalidacion);
    return GRR(infovalidacion, "Correo o contraseña no válidos");
  } catch {
    return {
      codigo: 400,
      mensaje:
        "Error al consultar la información del usuario, validar el correo ingresado",
    };
  }
};
let crearusuario = async (gpn, email, clave, nombre, apellido) => {
  try {
    let validaruser = await existeusuario(gpn);

    if (validaruser !== "") {
      return {
        codigo: 400,
        mensaje: "El usuario ya se encuentra registrado",
      };
    }

    let idpermiso = await obteneridpermiso("usuario");

    if (idpermiso === "") {
      return {
        codigo: 400,
        mensaje:
          "Ha ocurrido un error al crear el usuario, inténtelo más tarde",
      };
    }

    await insertarusuario(
      gpn,
      email,
      clave,
      nombre,
      apellido,
      idpermiso.idpermiso
    );

    validaruser = await existeusuario(gpn);
    return GRR(
      validaruser,
      "Ha ocurrido un error al crear el usuario, inténtelo más tarde"
    );
  } catch {
    return {
      codigo: 400,
      mensaje: "Ha ocurrido un error al crear el usuario, inténtelo más tarde",
    };
  }
};

let cambiarclave = async (gpn, email, clave, nuevaclave) => {
  try {
    let validacionclave = await validarusuario(email, clave);
    if (validacionclave === "") {
      return { codigo: 400, mensaje: "clave no valida" };
    }

    await actualizarclave(gpn, clave, email, nuevaclave);

    let validacionnuevaclave = await validarusuario(email, nuevaclave);
    return GRR(
      validacionnuevaclave,
      "Error en cambio de clave ,en caso de de algun problema con el acceso porfavor contactar a su consulour"
    );
  } catch (e) {
    return {
      codigo: 400,
      mensaje:
        "Error en cambio de clave ,en caso de de algun problema con el acceso porfavor contactar a su consulour",
    };
  }
};
let enviarcorreoactivacion = async (email) => {
  try {
    const emailencrypt = cryptr.encrypt(email);

    let info = await transporter.sendMail({
      from: "Simon EY <simon.ey.chile@gmail.com>",
      to: email,
      subject: "Recuperacion de contraseña ",
      text: "recuperacion de contraseña",
      html: emailactivarcuenta(email, emailencrypt),
    });
    return GRR(info.messageId, "Error al enviar el correo de validacion");
  } catch (e) {
    console.log(e);
  }
};
let recuperarclave = async (gpn) => {
  try {
    let correo = await obtenercorreo(gpn);

    if (correo === "") {
      return {
        codigo: 400,
        mensaje: "*El GPN ingresado no existe",
      };
    }

    let { email } = correo;

    let nuevaclave = generadorclaves(8);

    await actualizarclaverecuperada(gpn, email, nuevaclave);

    let validacionnuevaclave = await validarusuario(email, nuevaclave);

    if (validacionnuevaclave === "") {
      return {
        codigo: 400,
        mensaje: "*ha ocurrido un error en la recuperacion de contraseña",
      };
    }

    let info = await transporter.sendMail({
      from: "Simon EY <simon.ey.chile@gmail.com>",
      to: email,
      subject: "Recuperacion de contraseña ",
      text: "recuperacion de contraseña",
      html: emailrecuperarclave(email, nuevaclave),
    });
    return GRR(info.messageId, "*Error al enviar el correo de validacion,inténtelo más tarde ");
  } catch (e) {
    console.log(e);
    return ''
  }
};
let activarusuario = async (email) => {
  const emaildecrypt = cryptr.decrypt(email);

  await actualizarestadouser(emaildecrypt);
  let info = await infousuario(emaildecrypt);
  return GRR(
    info,
    "Usuario no encontrado en sistema, porfavor contacta a tu counsulour para revisar tu registro"
  );
};
// Generacion de respuesta de Datos
let GRR = (info, err) => {
  if (info == "") {
    return { codigo: 400, mensaje: err };
  } else {
    return { codigo: 200, mensaje: info };
  }
};

module.exports = {
  getinfousuario,
  validarusuarios,
  crearusuario,
  cambiarclave,
  enviarcorreoactivacion,
  activarusuario,
  recuperarclave,
};
