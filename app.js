const express = require('express')
const cors = require("cors")

// const { deflateSync } = require('zlib')
const app = express()
app.use(cors());
const port = 3000

const {connection} = require("./db/db_config");

app.get('/', (req, res) => {
    // let userInput = req.query.id;
    let userInput2 = req.query.match;
    // let userInput3 = req.query.language;
    // connection.query(`DELETE from movie_data WHERE id =${userInput}`, (err, results)=>{
    //     if (err){
    //         console.log(`error in query!`)
    //         // res.send(`error in db`)
    //     }
    //     else {
    //         console.log(results)
    //     }
    // })

    //suggestion
    connection.query(
        `SELECT title, release_year from movie_data WHERE title LIKE ?`,//? is used to prevent sql injection attacks (sanity check)
        [`${userInput2}%`], //actual input is provided as a second parameter inside an array
        (err,results) => {
        if (err){
            console.log(`error in query!`)
        }
        else {
            res.send(results)
            
        }
    })

//filtering based on language 
    // connection.query(
    //     `SELECT * from movie_data where language = ?`,//? is used to prevent sql injection attacks (sanity check)
    //     [`${userInput3}`], //actual input is provided as a second parameter inside an array
    //     (err,results) => {
    //     if (err){
    //         console.log(`error in query!`)
    //     }
    //     else {
    //         console.log(results)
    //     }
    // })

    //printing the data
    // connection.query(`SELECT * from movie_data`, (err,results) => {
    //     if (err){
    //         console.log(`error in query!`)
    //     }
    //     else {
    //         res.send(results)
    //         //console.log(results)
    //     }
    // })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})