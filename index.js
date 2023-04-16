require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const responseSchema = new Schema({
    response: { type: String, required: true }
});
const Response = mongoose.model("Response", responseSchema);

const createAndSaveResponse = (apiResponse, done) => {
    apiResponse.save(function(err, data) {
        if (err) return console.error(err);
        done(null, data);
    });
};

// localhost:3000
app.get('/', function (req, res) {
    res.send('{ "response": "Hello From kodiidok" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Will endpoint works" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

app.listen(process.env.PORT || 3000);
module.exports = app;