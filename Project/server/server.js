//-- Harshil Patel
// hap793 / 11290942
'use strict';

const path = require("path")
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');

let con = mysql.createConnection({
  host: '0.0.0.0',
  port: '3306',
  user: 'root',
  password: 'admin'
});


const PORT = 8080;
const HOST = '0.0.0.0';


// Helper
const panic = (err) => console.error(err)


// Connect to database
con.connect((err) => {

    if (err) { panic(err) }

    con.query("USE assignment;", (err, result) => {

        if (err) { panic(err) }

        else { console.log("Connected!"); }
    })
})


// Sketch of how to contact your database
function sql_insertion(param1, param2) {

    let statement = `INSERT INTO tname (p1, p2) VALUES ('${param1}', '${param2}')`
    con.query(statement, (err, result) => {

        if (err) { /* ... */ }

        else { /* ... */  }

    })
}

//insert in to table
function post(topic,data) {
    let statement = `INSERT INTO posts (Topic, Data, Timestamp) VALUES ('${topic}','${data}','${new Date()}')`
    con.query(statement, function (err, result) {

        if (err) {panic(err)}

        else { console.log("Inserted.");}
    })
}

app.post('/post', (req,res) => {
    var topic = req.body.topic;
    var data = req.body.data;
    post(topic,data);      
});

app.get('/getData', (req,res) => {
  let statement = `SELECT * FROM posts`  
  con.query(statement, function(err,result) {
    if (err){
      console.error(err)
      return
    }
    res.send(result);
  })
});

app.get('/getTopicAsc',(req,res) => {
    con.query(`SELECT * FROM posts ORDER BY Topic`, function(err,result){
        if (err){
            console.error(err)
            return
        }
        res.send(result);
    })
});

app.get('/getTopicDsc',(req,res) => {
    con.query(`SELECT * FROM posts ORDER BY Topic DESC`, function(err,result){
        if (err){
            console.error(err)
            return
        }
        res.send(result);
    })
});

app.get('/getTimeAsc',(req,res) => {
    con.query(`SELECT * FROM posts ORDER BY Timestamp`, function(err,result){
        if (err){
            console.error(err)
            return
        }
        res.send(result);
    })
});

app.get('/getTimeDsc',(req,res) => {
    con.query(`SELECT * FROM posts ORDER BY Timestamp DESC`, function(err,result){
        if (err){
            console.error(err)
            return
        }
        res.send(result);
    })
});

// app.get('/',(req,res) => {
//     res.send();
// });


function sql_request() {

    let statement = `SELECT FROM ...`
    con.query(statement, (err, result) => {

        if (err) { /* ... */ }

        else { /* ... */  }

    })
}

// app.use("/", express.static(path.join(__dirname, "pages")))
// app.use()
app.use(express.static('.', {index: 'posting.html'}));


app.listen(PORT,HOST);
console.log("up!")
