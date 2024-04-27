const express = require('express')
const cors = require("cors")

// const { deflateSync } = require('zlib')
const app = express()
app.use(cors()); //allows us to access
app.use(express.static('public')) 
app.use(express.json()) //lets express know that we will be expecting json data
app.use(express.urlencoded({ extended: true }))
const port = 3000

const {connection} = require("./db/db_config");

app.get('/data', (req, res) => {

    //printing the data
    connection.query(`SELECT * from movie_data`, (err,results) => {
        if (err){
            console.log(`error in query!`)
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }
        res.json(results)
            //console.log(results)
    })
});

app.post('/post', (req, res) => {
    const movieTitle = req.body.movieTitle;
    const releaseYear = req.body.releaseYear;
    const language = req.body.language;
    const createdAt = new Date();

    console.log(movieTitle)

    connection.query(
        'INSERT INTO movie_data (title, release_year, language, created_at) VALUES (?, ?, ?, ?)',
        [movieTitle, releaseYear, language, createdAt],
        (err, result) => {
            if (err) {
                console.error("Error adding movie:", err);
                return res.status(500).json({ error: 'Failed to add movie' });
            } else {
                console.log('Movie added:', movieTitle);
                res.json({ message: 'Movie added successfully' });
            }
        }
    );
});

app.post('/delete', (req, res) => {
    const movieTitle = req.body.title;
    const releaseYear = req.body.year;
    const language = req.body.language;
    
    connection.query('delete from movie_data where title = ? AND release_year = ?',
                    [movieTitle, releaseYear],
                    (err,result) => {
                        if(err) {
                            console.error('error deleting movie', err)
                            return res.status(500).json({error : 'failed to delete movie'})
                        }
                        else {
                            console.log('movie deleted :', movieTitle)
                            res.json({message: 'movie deleted successfully'})
                        }
                    })
                }
            )

    // let userInput = req.query.id;
    // let userInput2 = req.query.match;
    // let userInput3 = req.query.language;
    // let userInput4 = req.query.insert;

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
    // connection.query(
    //     `SELECT title, release_year, language FROM movie_data WHERE title LIKE ? AND language = ?`, // Removed parentheses around placeholders
    //     [`${userInput2}%`, `${userInput3}`], // Removed the extra array wrapper around userInput3
    //     (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             res.status(500).send('Error fetching data'); // Sending an error response
    //         } else {
    //             res.send(results);
    //         }
    //     }
    // );


// filtering based on language 
    // connection.query(
    //     `SELECT * from movie_data where language = ?`,//? is used to prevent sql injection attacks (sanity check)
    //     [`${userInput3}`], //actual input is provided as a second parameter inside an array
    //     (err,results) => {
    //     if (err){
    //         console.log(`error in query!`)
    //     }
    //     // else {
    //     //     res.send(results2)
    //     // }
    // })
    // res.send(responseData)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})