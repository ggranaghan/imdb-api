const express = require('express');
const app = express();
const process = require('process'); 
require('dotenv').config();
const request = require('request');


app.get("/movie", (req, res) => {

  request(`https://imdb-api.com/en/API/Top250Movies/${process.env.IMDB_APIKEY}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let movie = JSON.parse(body)
        console.log(movie)
        res.send(movie)
      }
    }
  )
})


app.listen(3001, () => console.log('listening on port 3001!'));


