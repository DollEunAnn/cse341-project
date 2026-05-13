const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// localhost:8080/ => then proceed to find the file routes/index.js and check all the routes there
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
});

