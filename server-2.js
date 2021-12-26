'use strict';

const path = require("path")
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 8000;
const HOST = '0.0.0.0';

var nano = require('nano')('http://admin:admin@cdb1:5984');
var posts = nano.use('posts');

posts.createIndex({
    index: {fields: ['Topic']}
  });
posts.createIndex({
    index: {fields: ['Date']}
  });

// Helper
const panic = (err) => console.error(err)

app.post('/chat', (req,res) => {
    var topic = req.body.topic;
    var data = req.body.data;
    var today = new Date();
    var response = new Object();
    posts.insert({Topic: topic,Data: data,Date: today}), (err) => 
    {
        if(err) {panic(err)}
    };
    response.answer = " Successfully posted."
    res.send(JSON.stringify(response));
});


app.get('/loadchat', (req,res) => {
    var data = "";
    var response = new Object();
    let query = {selector: {_id: {"$gt": null}}};
    posts.find(query).then((value) => {
        Object.keys(value["docs"]).forEach(function(key) {
            var row = value["docs"][key];
            data += row.Topic + " " + row.Data + " " + row.Date + "\n" ; 
            response.answer = data;
        });
        res.send(JSON.stringify(response));
    });
});

app.get('/topicasc', (req,res) => {

    var response = new Object();

    let query = {
        selector: { Topic: { "$gt": null } },
        limit: 30,
        skip: 0,
        sort: [ {"Topic": "asc" } ]
        }
    posts.find(query).then((value) => {
        console.log(value["docs"]);
    });

    response.answer= "Sorted";
    res.send(JSON.stringify(response));
});

app.get('/topicdesc', (req,res) => {

    var response = new Object();

    let query = {
        selector: { Topic: { "$gt": null } },
        limit: 30,
        skip: 0,
        sort: [ {"Topic": "desc" } ]
        }
    posts.find(query).then((value) => {
        console.log(value["docs"]);
    }); 
    response.answer = "Sorted"; 
    res.send(JSON.stringify(response));
});

app.get('/timeasc', (req,res) => {

    var response = new Object();

    let query = {
        selector: { Date: { "$gt": null } },
        limit: 30,
        skip: 0,
        sort: [ {"Date": "asc" } ]
        }
    posts.find(query).then((value) => {
        console.log(value["docs"]);
    });  
    response.answer = "Sorted"; 
    res.send(JSON.stringify(response));
});

app.get('/timedesc', (req,res) => {

    var response = new Object();

    let query = {
        selector: { Date: { "$gt": null } },
        limit: 30,
        skip: 0,
        sort: [ {"Date": "desc" } ]
        }
    posts.find(query).then((value) => {
        console.log(value["docs"]);
    });  
    response.answer = "Sorted"; 
    res.send(JSON.stringify(response));
});

app.use("/", express.static(path.join(__dirname, "pages")))

app.listen(PORT,HOST);
console.log("up!")

