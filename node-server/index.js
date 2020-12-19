const express = require('express');
const bodyParser = require('body-parser');
let AWS = require('aws-sdk');

let awsConfig = {
  region: 'us-west-2',
  endpoint: 'http://dynamodb.us-west-2.amazonaws.com',
  accessKeyId: 'AKIAQXV63QYXLJJ65EN4',
  secretAccessKey: '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',
};

let tttConfig = {
  TableName: 'tic-tac-toe',
};

AWS.config.update(awsConfig);
let ddb = new AWS.DynamoDB.DocumentClient();
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/get-game', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let game_id = req.query.game_id || -1;
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

app.post('/create-game', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let game_id = req.query.game_id || -1;
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

app.get('/get-all-games', async (req, res) => {
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

let server = app.listen(8000, function () {
  console.log('Server is listening on port 8000');
});
