//-- Harshil Patel
// hap793 / 11290942
// cmpt353 asn3 -->
'use strict';

const path = require("path")
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;
const HOST = '0.0.0.0';
var nano = require('nano')('http://hap793:000000@localhost:5984');
var data_B = nano.use('posts');



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
    var time = new Date();
    data_B.insert({topic,data,time},(err,body,header)=>{if(err){
        console.log(err)
        return;
    }
    console.log('DB updated');
});
    // post(topic,data);      
});
app.post('/post', (req,res) => {
    data_base.createIndex({"index": {"fields": ["topic"]},
        "name" : "topic",
        "type" : "json"
    })
    data_base.createIndex({"index": {"fields": ["data"]},
        "name" : "data",
        "type" : "json"
    })
    data_base.createIndex({"index": {"fields": ["timestamp"]},
        "name" : "timestamp",
        "type" : "json"
    })
});

app.get('/getData', (req,res) => {
    var q = {"selector": {"topic": {"$gt": null}},
    "fields": ["topic","data","timestamp"],
}
db.find(q).then((body)=>{res.send(body.docs);})
});

app.get('/getTopicAsc',(req,res) => {
    var q = {"selector": {"topic": {"$gt": null}},
            "fields": ["topic","data","timestamp"],
            "sort": [ {"topic": "asc" } ],
    }
    db.find(q).then((body)=>{res.send(body.docs);})
})

app.get('/getTopicDsc',(req,res) => {
    var q = {"selector": {"topic": {"$gt": null}},
    "fields": ["topic","data","timestamp"],
    "sort": [ {"topic": "desc" } ],
}
db.find(q).then((body)=>{res.send(body.docs);})
})

app.get('/getTimeAsc',(req,res) => {
    var q = {"selector": {"topic": {"$gt": null}},
            "fields": ["topic","data","timestamp"],
            "sort": [ {"timestamp": "asc" } ],
    }
    db.find(q).then((body)=>{res.send(body.docs);})
})

app.get('/getTimeDsc',(req,res) => {
    var q = {"selector": {"topic": {"$gt": null}},
    "fields": ["topic","data","timestamp"],
    "sort": [ {"timestamp": "desc" } ],
}
db.find(q).then((body)=>{res.send(body.docs);})
})

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
