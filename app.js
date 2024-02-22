const express = require('express')
const { deflateSync } = require('zlib')
const app = express()
const port = 3000

const {connection} = require("./db/db_config");

app.get('/', (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let opr = req.query.opr;
    let result;

    switch (opr) {
        case 'add':
            result = num1 + num2;
            break;
        
        case 'sub':
            result = num1 - num2;
            break;
        
        case 'div':
            result = num1/num2;
        
        case 'multiply':
            result = num1*num2;
    }

    res.send(`Hello ${result}`)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})