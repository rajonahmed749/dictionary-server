const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const port = process.env.PORT || 7000;

const app = express();
app.use(bodyParser.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dictionaryapp.uer2f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqa8e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send("This is Dictionary Server")
    console.log("database connected")
})


client.connect(err => {
    const collection = client.db("wordsDictionary").collection("words");

    console.log("unsuccecfull", err);
    // All services
    app.post('/addWord', (req, res) => {
        const newWord = req.body;
        collection.insertOne(newWord)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    });

});



app.listen(process.env.PORT || port)