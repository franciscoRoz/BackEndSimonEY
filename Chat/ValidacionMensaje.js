const { insertsolicitudcargalaboral, obtenerid, insertpeticionrpaCL } = require("../Querys-BD/Qerys/ChatQeryFuncion/CargaLaboral")

let ValidacionSolicitudDF = async (text,permiso,gtime,expense) =>{

let {Engagement,Fecha,Lunes,Martes,Miercoles,Jueves,Viernes} = gtime   
let {Descripciondevolucion,Engagementdevolucion,Montodevolucion} = expense


switch (text) {
    case "Hola ,Soy simón tu asistente en EY las acciones disponibles son":
        console.log(permiso);
        if(permiso === "administrador"){
        
        return(`${text}:
        1)realizar registro GT&E 
        2)Modificar registro GT&E
        3)Eliminar registro GT&E
        4)Realizar Expense
        5)Consultar una solicitud de expense
        7)Asignar perfil administrador
        8)Obtener numero de solicitudes realizadas hoy`)
        }else{
            return `${text}:
        1)realizar registro GT&E 
        2)Modificar registro GT&E
        3)Eliminar registro GT&E
        4)Realizar Expense
        5)Consultar una solicitud de expense`
     
        }
    case "confirmardatosgtime":
        
        return `Los datos que se registraran en tu gtime son los siguientes:
        Engagement:${Engagement}
        Fecha:${Fecha}
        Horas ingresadas:
        Lunes:${Lunes}
        Martes:${Martes}
        Miercoles:${Miercoles}
        Jueves:${Jueves}
        Viernes:${text}

        porfavor confirma tu solicitud escribiendo SI o NO comorespuesta
        `
    case "Validardatosexpense":
        
        return`los datos que se registraran en un expense son los siguientes:
        Engagement:${Engagementdevolucion}
        Monto:${Montodevolucion}
        Descripcion:${text}
         `
    
        default:
        break;
}




    
}



module.exports = {ValidacionSolicitudDF}