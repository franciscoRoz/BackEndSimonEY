const dialogflow = require("dialogflow");
const config = require("../config");

const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY,
};
console.log("<----------------------------Credentials------------------------>");
console.log(credentials);
console.log("<----------------------------Credentials------------------------>");

const sessionClient = new dialogflow.SessionsClient({
  projectId: config.GOOGLE_PROJECT_ID,
  credentials,
});
console.log("<----------------------------Session Cliente------------------------>");
console.log(sessionClient);
console.log("<----------------------------Session Cliente------------------------>");


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function sendToDialogFlow(msg, session, source, params) {
  
  let textToDialogFlow = msg;
  try {
    const sessionPath = sessionClient.sessionPath(
      config.GOOGLE_PROJECT_ID,
      session

    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textToDialogFlow,
          languageCode: config.DF_LANGUAGE_CODE,
        },
      },
      queryParams: {
        payload: {
          data: params,
        },
      },
    };
    console.log("<----------------------------Request------------------------>");
    console.log(request);
    console.log("<----------------------------Request------------------------>");
    

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log("INTENT EMPAREJADO: ", result.intent.displayName);
    let defaultResponses = [];
    if (result.action !== "input.unknown") {
      result.fulfillmentMessages.forEach((element) => {
        if (element.platform === source) {
          defaultResponses.push(element);
        }
      });
    }
    if (defaultResponses.length === 0) {
      result.fulfillmentMessages.forEach((element) => {
        if (element.platform === "PLATFORM_UNSPECIFIED") {
          defaultResponses.push(element);
        }
      });
    }
    result.fulfillmentMessages = defaultResponses;
    console.log("<----------------------------result------------------------>");
    console.log(result);
    console.log("<----------------------------result------------------------>");
    return result;
    // console.log("se enviara el resultado: ", result);
  } catch (e) {
    console.log("error");
    console.log(e);
  }
}

module.exports = {
  sendToDialogFlow,
};
