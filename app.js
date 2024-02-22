const express = require('express')
const { deflateSync } = require('zlib')
const app = express()
const port = 3000

const {connection} = require("./db/db_config");

app.get('/', (req, res) => {
    connection.query(`SELECT * FROM movie_data`, (err, results)=>{
        if (err){
            console.log(`error in query!`)
            res.send(`error in db`)
        }
        else {
            res.send(results);
        }
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})