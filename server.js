const express = require('express');
const app = express();

const mongodb = require('./database/connect');

const port = process.env.PORT || 3000;

// localhost:8080/ => then proceed to find the file routes/index.js and check all the routes there
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
});

