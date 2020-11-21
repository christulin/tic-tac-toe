const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Include secrets
require('dotenv').config({ path: __dirname + '/../.env.private' });

const awsConfig = {
  region: 'us-west-2',
  endpoint: 'http://dynamodb.us-west-2.amazonaws.com',
  accessKeyId: process.env.DDB_ACCESS,
  secretAccessKey: process.env.DDB_SECRET,
};

const tttConfig = {
  TableName: 'tic-tac-toe',
};

AWS.config.update(awsConfig);
const ddb = new AWS.DynamoDB.DocumentClient();
const urlParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// API
app.post('/login', urlParser, jsonParser, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { username, password } = req.body;

  ddb.get(
    {
      TableName: 'Users',
      Key: {
        username,
      },
    },
    (err, data) => {
      if (err) {
        return res.send(err);
      } else {
        const isItem = 'Item' in data;
        const response = isItem ? { ...data.Item, success: true } : { success: false };
        return res.send(response);
      }
    }
  );
});

app.get('/get-game', urlParser, jsonParser, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const game_id = req.query.game_id || -1;
  ddb.get(
    {
      ...tttConfig,
      Key: {
        game_id,
      },
    },
    (err, data) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(data);
      }
    }
  );
});

app.post('/create-game', urlParser, jsonParser, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const game_id = req.query.game_id || -1;
  ddb.put(
    {
      ...tttConfig,
      Item: {
        game_id,
        isXsTurn: true,
        board: [],
      },
    },
    (err, data) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(data);
      }
    }
  );
});

app.get('/get-all-games', urlParser, jsonParser, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  ddb.scan(
    {
      ...tttConfig,
    },
    (err, data) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(data);
      }
    }
  );
});

app.listen(8000, function () {
  console.log('Server is listening on port 8000');
});

// WebSocket
io.on('connection', socket => {
  socket.on('new state', update => {
    socket.broadcast.emit('update squares', update);
  });
});

server.listen(3030);
