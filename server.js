'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: CHANNNEL_SECRET,
  channelAccessToken: CHANNEL_ACCESS_TOKEN
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let returnText = '残念！';

  if (event.message.text === 'コロンビア') {
    returnText = '21';
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: returnText
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
