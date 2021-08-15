const {getdatawithquery} =require('./dboperaciones.js')

let registrocargalaboral = async(fechainicio,fechafin,engagement,codigoengagement,fechaingreso )=>{
    let res =await getdatawithquery(
    `INSERT INTO [dbo].[REGISTRO_CARGA_LABORAL]
    (   
        [fechainicio]
        ,[fechafin]
        ,[engagement]
        ,[codigoengagement]
        ,[fechaingreso]
    )
    VALUES
    (
        ${fechainicio}
        ,${fechafin}
        ,${engagement}
        ,${codigoengagement}
        ,${fechaingreso}
    )
    `)
    console.log( res );
    return res;
}

let solicitudreembolso = async(monto,engagement,codigoengagement,descripcion,fechaingreso )=>{
    let res =await getdatawithquery(`
    INSERT INTO [dbo].[SOLICITUD_REEMBOLSO]
    (
        [monto]
        ,[engagement]
        ,[codigoengagement]
        ,[descripcion]
        ,[fechaingreso])
    VALUES
    (
        ${monto}
        ,${engagement}
        ,${codigoengagement}
        ,${descripcion}
        ,${fechaingreso})
    `)
    console.log( res );
    return res;
}

let solicitud = async(iduser,idsolicitudreembolso,idsolicitudcargalaboral,idtiposolicitud,codigoconversacion )=>{
    let res =await getdatawithquery(`
    INSERT INTO [dbo].[SOLICITUD]
        (
            [iduser]
           ,[idsolicitudreembolso]
		   ,[idsolicitudcargalaboral]
           ,[idtiposolicitud]
           ,[codigoconversacion]
           ,[estadosolicitud]
        )
    VALUES
        (
            ${iduser}
		   ,${idsolicitudreembolso} 
           ,${idsolicitudcargalaboral}
           ,${idtiposolicitud}
           ,${codigoconversacion}
           ,'pendiente'
        )
    `)
    console.log( res );
    return res;
}
module.exports = {
    registrocargalaboral:registrocargalaboral,
    solicitudreembolso:solicitudreembolso,
    solicitud:solicitud,
    
  };
  