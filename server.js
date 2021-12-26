// Harshil Patel
// hap793 / 11290942
// CMPT353 asn2
'use strict';

// package
const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function post(topic,data){
  let date = new Date();


  var post = `Topic: ${topic}  Data: ${data}  Time: `
  fs.writeFile('posts.txt', "\n" + post + date , {flag: 'a+'},err =>{
    if (err){
      console.error(err)
      return
    }
  } )
}
app.post('/post', (req,res) => {
        var topic = req.body.topic;
        var data = req.body.data;
        post(topic,data);      
   });

app.get('/getData', (req,res) => {
  fs.readFile('posts.txt', 'utf8', (err,data) => {
    if (err){
      console.error(err)
      return
    }
    res.send(data);
  })
})

app.use(express.static('.', {index: 'posting.html'}));

app.listen(PORT, HOST);
console.log('up and running');