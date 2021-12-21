const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileUpload = require('express-fileupload')

const port = process.env.PORT || 3000;



// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "20mb",
  })
);

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));











app.use("/handlemsg", require("./Chat/ApiChat"));
app.use("/user", require("./Usuario/ApiUsuario"));
app.use("/imagenes", require("./Chat/SubirImagen"));
app.get("/", (req, res) => {
  return res.send("Chatbot Funcionando!!");
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
