
const express = require("express");
const router = express.Router();
const CLOUDINARY_URL=require('../Config/configcloudinary')
const path = require('path');

const cloudinary = require('cloudinary').v2;
const { Now } = require("../Utility/FechaLocal");
cloudinary.config(CLOUDINARY_URL);

router.post("/subir", async function (req, res) {
    let sampleFile;
    let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
    res.status(400).send('No existen archivos');
    return;
  }

  const {imagen} = req.files;
  const {tempFilePath}=imagen
  const {DataMensaje}= req.body
  let {gpn}=DataMensaje

  let extension =imagen.name.split(".");
  extension =extension[extension.length-1]
  let extensionespermitidas=['jpg','png','jpeg']

  if(!extensionespermitidas.includes(extension)){
      res.status(400).send('extension no valida para ser ejecutada')
  }
  let nombrearchivo =`${gpn}_${Now().replaceAll(":","-").replaceAll("-","_").replaceAll(' ','')}.${extension}`



   uploadPath = path.join( __dirname , '../ImagenesSubidas/' , nombrearchivo);

  const resp =await cloudinary.uploader.upload(tempFilePath);
    console.log(resp);
    res.send(resp.url)
});

router.get("/all", async function (req, res) {

});

module.exports = router;
