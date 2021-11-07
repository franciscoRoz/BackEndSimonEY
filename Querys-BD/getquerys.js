const {getdatawithquery} =require('./dboperaciones.js')

let getcargaregistrada = async(fechaingreso)=>{
    let res =await getdatawithquery(`
    SELECT [idsolicitud] 
    FROM [dbo].[REGISTRO_CARGA_LABORAL] 
    WHERE fechaingreso=${fechaingreso};
    `)
  
    return res;
}

let getreembolsoregistrado = async(fechaingreso)=>{
    let res =await getdatawithquery(`
    SELECT [idsolicitud] 
    FROM [dbo].[SOLICITUD_REEMBOLSO] 
    WHERE fechaingreso=${fechaingreso};
    `)
    
    return res;
}

module.exports = {
    getcargaregistrada,
    getreembolsoregistrado
  };
  