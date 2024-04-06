"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  { urlencoded, json } = require("body-parser"),
  port = 3000,
  app = express().use(bodyParser.json());

app.use(
    urlencoded({
      extended: true
    })
);


app.use(json({ verify: verifyRequestSignature }));




app.listen(port, () => {
  	console.log(`Server is running on port ${port}`);
  });

app.get("/webhook", (req, res) => {
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === "subscribe" && token === 'EAAXIJwZCPKYoBO58sOyiyeUWA7vQZAzwlx5AWnavQ7ck6QfTHkpUoDnnhPLqg6TlX3IjV0BfWoeIQDyXyzXmRq4UeGpZAcytcuRBWR4quWy74xgcP7KjcVnhadZBJulD0WmNFOy3FgEDNb1gPsvbwU450pVZB6Te23wKMwfZCuBZBmjAEKKMwNByBLywutZCmmwZB8zJrKkJJknftYSmC7wZDZD') {
        // Respond with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
});

app.post("/webhook", (req, res) => {
    let body = req.body;
  
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    // ...
        // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
    // ...
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
    }); 
