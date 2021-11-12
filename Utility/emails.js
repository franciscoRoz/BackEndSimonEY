const emailrecuperarclave = (email,nuevaclave) => {
  return `<table style="height: 475px; margin-left: auto; margin-right: auto;" width="522" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td style="width: 518px; text-align: center;" bgcolor="black">
  <h2 style="color: white; text-align: center;">Hola,${email}</h2>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p style="color: white; text-align: center;">se ha generado una nueva clave de acceso para tu cuenta la cual es :</p>
  <p>&nbsp;</p>
  <p style="color: white; text-align: center ;fontsize=25;">${nuevaclave}</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  </td>
  </tr>
  </tbody>
  </table>`;
};

const emailactivarcuenta = (email, emailencrypt) => {
  return `<table style="height: 475px; margin-left: auto; margin-right: auto;" width="522" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="width: 518px; text-align: center;" bgcolor="black">
<h2>Hola,${email}</h2>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="color: white; text-align: center;">Te falta un paso para activar tu cuenta.   Haz clic en el siguiente botón para verificar tu dirección de correo electrónico:</p>
<p>&nbsp;</p>
<a title="link activacion" href="https://testbotey.herokuapp.com/user/info/${emailencrypt}" target="_blank" rel="noopener">Activar Cuenta</a>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>`;
};

module.exports = { emailrecuperarclave, emailactivarcuenta };
