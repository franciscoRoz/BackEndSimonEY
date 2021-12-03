export const now = ()=>{
    var date = new Date().getDate(); //dia actual
    var month = new Date().getMonth() + 1; //mes actual
    var year = new Date().getFullYear(); //año actual
    var hours = new Date().getHours(); //horas actual
    var min = new Date().getMinutes(); //minutos actual
    var sec = new Date().getSeconds(); //segundos actual
    var mils = new Date().getMilliseconds(); //milisegundos actual

      return  year + '-' + month + '-' + date  
      + ' ' + hours + ':' + min + ':' + sec+ ':' + mils
      
}