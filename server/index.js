require('dotenv').config();

const express = require('express');
const request = require('superagent');

const requestF = async (req, res) => {
  const point = req.path.replace('/api', '');

  const {body: result} = await request
    .get(`${process.env.API_DOMAIN}${point}`)
    .set('Cookie', `access_token=${process.env.API_TOKEN}`)
    .query({
      ...{
        project_id: '5600',
        offset: '0',
        limit: '9999999',
        format: 'json'
      },
      ...req.query
    });

  res.set('Access-Control-Allow-Origin', '*');
  res.send(result);
};

const app = express();

app.get('/api/sources/', requestF);
app.get('/api/chart/sources/', requestF);
app.get('/api/chart/campaigns/', requestF);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
