const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require("./Routes/users");

require("dotenv").config();

const app = express();

const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(userRoutes)

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