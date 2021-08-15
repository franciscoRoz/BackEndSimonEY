let getdatenow = () =>{
    //se crea fecha con formato estandar por la funcion date
    let today = new Date();
    //se formatea con parametros necesarios para insertar
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
}

let getdatetimenow = () =>{
     //se crea fecha con formato estandar por la funcion date
     let today = new Date();
     //se formatea con parametros necesarios para insertar
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
}

let getfirstdayweek = () =>{
    //se crea fecha con formato estandar por la funcion date
    let today = new Date();
    //variable usada para calcular los dias de difefrencias en relacion al primer dia de la semana
    let daydiff =today.getDay();
    switch(daydiff){
        case 0 :
            daydiff=-1;
            break;
        case 1 :
            daydiff=0;
            break;
        case 2 :
            daydiff=1;
            break;
        case 3 :
            daydiff=2;
            break;
        case 4 :
            daydiff=3;
            break;
        case 5 :
            daydiff=4;
            break;
        case 6 :
            daydiff=5;
            break;
    }
    //se formatea con parametros necesarios para insertar
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()-daydiff}`
}

let getlastdayweek = () =>{
    //se crea fecha con formato estandar por la funcion date
    let today = new Date();
    //variable usada para calcular los dias de difefrencias en relacion al primer dia de la semana
    let daydiff =today.getDay();
    switch(daydiff){
        case 0 :
            daydiff=5;
            break;
        case 1 :
            daydiff=4;
            break;
        case 2 :
            daydiff=3;
            break;
        case 3 :
            daydiff=2;
            break;
        case 4 :
            daydiff=1;
            break;
        case 5 :
            daydiff=0;
            break;
        case 6 :
            daydiff=-1;
            break;
    }
    //se formatea con parametros necesarios para insertar
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+daydiff}`
}


module.exports = {
    getdatetimenow:getdatetimenow,
    getdatenow:getdatenow,
    getfirstdayweek:getfirstdayweek,
    getlastdayweek:getlastdayweek,
  };
  