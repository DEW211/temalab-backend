const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const sendToHass = (req, res) => {
       
    
    /* fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTZhMzU4ZjBjM2Y0ZjQ5YWM0YjkyNDdlMDBjZDFkNSIsImlhdCI6MTU3MTA5Mzc4MSwiZXhwIjoxODg2NDUzNzgxfQ.lqmPlq0tTX_6MKoFSJQIzzjFaF9xZTtwNhOOHrJkdMA'
      },
      body: JSON.stringify({state: "off"})
    }) */

    axios({
        method: 'post',
        url: 'https://demo.nt.t-bond.hu/api/states/' + req.body.entityID.toString(),
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTZhMzU4ZjBjM2Y0ZjQ5YWM0YjkyNDdlMDBjZDFkNSIsImlhdCI6MTU3MTA5Mzc4MSwiZXhwIjoxODg2NDUzNzgxfQ.lqmPlq0tTX_6MKoFSJQIzzjFaF9xZTtwNhOOHrJkdMA'
        },
        data:  {state: req.body.state}
      })
    console.log(req.body);
    res.status(200).json({ok: "ok"});
}
///////////////
async function  getHistory(req, res) {
  
  
  let response = await axios({
    url: 'https://demo.nt.t-bond.hu/api/history/period',
    method: 'get',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTZhMzU4ZjBjM2Y0ZjQ5YWM0YjkyNDdlMDBjZDFkNSIsImlhdCI6MTU3MTA5Mzc4MSwiZXhwIjoxODg2NDUzNzgxfQ.lqmPlq0tTX_6MKoFSJQIzzjFaF9xZTtwNhOOHrJkdMA'
    },
  })

  

  console.log(response.data);
  res.status(200).send(response.data)//.json(response);
}
async function getLog(req, res){
  let response = await axios({
    url: 'https://demo.nt.t-bond.hu/api/error_log',
    method: 'get',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZTZhMzU4ZjBjM2Y0ZjQ5YWM0YjkyNDdlMDBjZDFkNSIsImlhdCI6MTU3MTA5Mzc4MSwiZXhwIjoxODg2NDUzNzgxfQ.lqmPlq0tTX_6MKoFSJQIzzjFaF9xZTtwNhOOHrJkdMA'
    },
  })

  res.status(200).send(response.data)

}

//state update
app.post('/api/states', sendToHass);
//get history
app.get('/api/history/period/:timestamp', getHistory)
//get logbook
app.get('/api/error_log', getLog)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));