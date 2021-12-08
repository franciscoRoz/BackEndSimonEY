let ValidacionSolicitudDF = (text,permiso,gtime,expense) =>{
    
switch (text) {
    case "Hola ,Soy simón tu asistente en EY las acciones disponibles son":
        if(permiso === "administrador"){
            return`${text}:
        1)realizar registro GT&E 
        2)Modificar registro GT&E
        3)Eliminar registro GT&E
        4)Realizar Expense
        5)Consultar una solicitud de expense
        7)Asignar perfil administrador
        8)Obtener numero de solicitudes realizadas hoy`
        }else{
            return `${text}:
        1)realizar registro GT&E 
        2)Modificar registro GT&E
        3)Eliminar registro GT&E
        4)Realizar Expense
        5)Consultar una solicitud de expense`
     
        }
    case "confirmardatosgtime":
        let {Engagement,Fecha,Lunes,Martes,Miercoles,Jueves,Viernes} = gtime
        return `Los datos que se registraran en tu gtime son los siguientes:
        Engagement:${Engagement}
        Fecha:${Fecha}
        Horas ingresadas:
        Lunes:${Lunes}
        Martes:${Martes}
        Miercoles:${Miercoles}
        Jueves:${Jueves}
        Viernes:${Viernes}

        porfavor confirma tu solicitud escribiendo SI o NO comorespuesta
        `
    case "Validardatosexpense":
        let {Descripciondevolucion,Engagementdevolucion,Montodevolucion} = expense
        return`los datos que se registraran en un expense son los siguientes:
        Engagement:${Engagementdevolucion}
        Monto:${Montodevolucion}
        Descripcion:${Descripciondevolucion}
         `
    case "":
    case "":
    
        default:
        break;
}




    
}



module.exports = {ValidacionSolicitudDF}