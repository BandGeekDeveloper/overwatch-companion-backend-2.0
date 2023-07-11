const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log("Succesfully connected to Overwatch database!");

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    })
})
.catch(err => {
    console.error("Failed to connect to Overwatch database", err);
});