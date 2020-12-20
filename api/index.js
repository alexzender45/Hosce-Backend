import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');
//
//
// error 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use((error, req, res, next) => res.status(error.status || 500).json(error));
routes(app);
app.use(express.json())

const appID = '24592d08bd5982d';
const apiKey = 'dfc6824f9a6c2df10cc797d485b975b290412f08';
const agentUID = 'ecommerce-agent';

const url = 'https://api.cometchat.com/v1';

const headers = {
  'Content-Type': 'application/json',
  appid: appID,
  apikey: apiKey,
};

app.get('/api/create', (req, res) => {
  const data = {
    uid: new Date().getTime(),
    name: 'customer',
  };
  axios
    .post(`${url}/users`, JSON.stringify(data), {
      headers,
    })
    .then(response => {
      requestAuthToken(response.data.data.uid)
        .then(token => {
          console.log('Success:' + JSON.stringify(token));
          res.json(token);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
});

app.get('/api/auth', (req, res) => {
  const uid = req.query.uid;
  requestAuthToken(uid)
    .then(token => {
      console.log('Success:' + JSON.stringify(token));
      res.json(token);
    })
    .catch(error => console.error('Error:', error));
});

const requestAuthToken = uid => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/users/${uid}/auth_tokens`, null, {
        headers,
      })
      .then(response => {
        console.log('New Auth Token:', response.data);
        resolve(response.data.data);
      })
      .catch(error => reject(error));
  });
};

app.get('/api/users', (req, res) => {
  axios
    .get(`${url}/users`, {
      headers,
    })
    .then(response => {
      const { data } = response.data;
      const filterAgentData = data.filter(data => {
        return data.uid !== agentUID;
      });
      res.json(filterAgentData);
    })
    .catch(error => console.error('Error:', error));
});
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));

module.exports = app;
