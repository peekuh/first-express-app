const express = require('express')
const { deflateSync } = require('zlib')
const app = express()
const port = 3000

const {connection} = require("./db/db_config");

app.get('/', (req, res) => {
    let userInput = req.query.id;
    let userInput2 = req.query.language;
    connection.query(`DELETE from movie_data WHERE id =${userInput}`, (err, results)=>{
        if (err){
            console.log(`error in query!`)
            // res.send(`error in db`)
        }
        else {
            console.log(results)
        }
    })

    connection.query(`SELECT * from movie_data where language = "${userInput2}"`, (err,results) => {
        if (err){
            console.log(`error in query!`)
        }
        else {
            res.send(results)
        }
    })

    connection.query(`SELECT * from movie_data`, (err,results) => {
        if (err){
            console.log(`error in query!`)
        }
        else {
            // res.send(results)
            console.log(results)
        }
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})