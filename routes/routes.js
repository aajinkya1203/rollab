const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');



router.post('/to-bot', (req, res)=>{
    // console.log("Dets:", req.body)
    runSample(req.body.query).then(data=>{
        // console.log("Result", data);
        res.json(data);
    }).catch(err=>{
        // console.log("Caught err", err)
    })

});

// A unique identifier for the given session
const sessionId = uuid.v4();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(query, projectId = 'rollab-gkjg') {
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        // keyFilename: "C:/Users/Aajinkya/Desktop/FWD/test/rollab/models/rollab-assistant.json"
        keyFilename: "./models/rollab-assistant.json"
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: query,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    // console.log(` \n Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      // console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      // console.log(`  No intent matched.`);
    }
    return result.fulfillmentText;
  }


module.exports = router;