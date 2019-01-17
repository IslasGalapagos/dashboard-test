require('dotenv').config();

const express = require('express');
const request = require('superagent');

const app = express();

app.get('/api/sources/', async (req, res) => {
  const {body: result} = await request
    .get(`${process.env.API_DOMAIN}/sources/`)
    .set('Cookie', `access_token=${process.env.API_TOKEN}`)
    .query({
      project_id: '5600',
      offset: '0',
      limit: '9999999',
      date_from: '2018-02-13',
      date_to: '2018-02-19',
      format: 'json'
    });

  res.set('Access-Control-Allow-Origin', '*');
  res.send(result);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
