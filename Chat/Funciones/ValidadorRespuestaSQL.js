let ValidadorResSql = (id,error,mensaje)=>{
    if (error !== "" && id !== "") {
        return error;
      }
      return mensaje;
}
module.exports = { ValidadorResSql };