'use strict';

const PAGE_ACCESS_TOKEN = 'EAATcnIiARngBAEaisRYKSLEQLMoQqGP957XBwjbkmeg9S1ZBJwPqOvId3NlsQKMUd45Pk4bKPLdZATIG1oIOZBJIQD54uvkNzjsDyDZCZAGHaLVUkULIsaHjIVZBD8YtFL7pEw9uZBkIjc3gUtNts3HwNhN838PgSs0IILKDpZAP6ogf7lAj2fMPvXqQfZAGa7AsZD';

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());

app.listen(process.env.PORT || 8000, () => console.log('webhook is listening'));

app.get('/ping', (req, res) => {
    res.send('Work!');
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = 'AAD77370EA53760206FD9553A9E676B114F3ED37204F53A3C8110341B439B585';

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        body.entry.forEach(function(entry) {
            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

}
