const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const router = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    });
});

app.use('/', router);

app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'Not found route'
    })
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});