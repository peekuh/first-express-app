const mysql =  require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1", 
    user: "root",
    password: "Gungun2711!",
    database: "movies"
});

connection.connect((err)=>{
    if(err){
        console.log(`database error: ${err}`);
    } else {
        console.log(`database connection successful`);
    }
});

module.exports = { connection };