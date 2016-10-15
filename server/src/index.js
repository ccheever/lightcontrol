import express from 'express';

import lutron from './lutron';

const app = express();

const lutronClient = lutron();

app.get('/', (req, res) => {
  res.send(`Hello world!`);
});

app.get('/switch/:room/:set', (req, res) => {
  let room = req.params.room;
  let set = false;
  try {
    set = parseInt(req.params.set);
  } catch (e) {}

  console.log(`room=${room} set=${set}`);

  switch (room) {
    case 'charlie':
      lutronClient.charliesRoomLights(set);
      res.send(`Set Charlie's Room lights to ${set}`);
      break;

    case 'all':
      lutronClient.allLights(set);
      res.send(`Set all lights to ${set}`);
      break;

    default:
      res.send(`I don't know about the room '${room}'`);
      break;
  }

});

app.listen(3000);
