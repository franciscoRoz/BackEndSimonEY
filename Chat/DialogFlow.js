const dialogflow = require("dialogflow");
const config = require("../Config/config");

const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY,
};

const sessionClient = new dialogflow.SessionsClient({
  projectId: config.GOOGLE_PROJECT_ID,
  credentials,
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function sendToDialogFlow(msg, session, source, params) {
  try {
    const sessionPath = sessionClient.sessionPath(
      config.GOOGLE_PROJECT_ID,
      session
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: msg,
          languageCode: config.DF_LANGUAGE_CODE,
        },
      },
      queryParams: {
        payload: {
          data: params,
        },
      },
    };
    let defaultResponses;
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log("INTENT EMPAREJADO: ", result.intent.displayName);
    let parametro = Object.keys(result.parameters.fields)[0];
    let valorparametro =result.parameters.fields[`${parametro}`];

  
    if (valorparametro === undefined) {
      defaultResponses = {
        text: result.fulfillmentText,
        parametro: "",
        valorparametro: "",
      };
    } else {
      defaultResponses = {
        text: result.fulfillmentText,
        parametro,
        valorparametro: valorparametro.stringValue,
      };
    }

    return defaultResponses;
  } catch (e) {
    console.log("error");
    console.log(e);
  }
}

module.exports = {
  sendToDialogFlow,
};
