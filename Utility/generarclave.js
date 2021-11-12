let generadorclaves=(length) =>{
   
    characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 

    var pass = "";
    for (i=0; i < length; i++){
        
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        
    }
    return pass;
}
module.exports={
    generadorclaves
}