const express = require('express')
const app = express()
var bodyParse = require("body-parser")

app.use(bodyParse.urlencoded({ extended: false }));
// utiliser le bodyparser pour pouvoir definir ce que je renvoie en post sinon ca met undefined


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})


app.get("/database", function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pascal";
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db("pascal");
        dbo.collection("personnages").findOne({}, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result)
            database.close();
        })
    });
})

app.post("/formulaire", function (req, res) {
    // console.log(req.body.type1);
    var nom = req.body.name
    var type = req.body.type1

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pascal";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("pascal");
        var ajout = { name: nom, genre: type };
        dbo.collection("personnages").insertOne(ajout, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(result)
            res.send(result)
          
            db.close();
        });
    });
})





app.listen(3005)