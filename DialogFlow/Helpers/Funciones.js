const { sendToDialogFlow } = require("../DialogFlow");

app.post("/Enviarmensaje", express.json(), function (req, res) {

    [msg,gpn,source]= req.body;
  
  
    let resDF = sendToDialogFlow(msg,gpn,source,undefined);
  
    res.send(resDF).status(200) 
  });