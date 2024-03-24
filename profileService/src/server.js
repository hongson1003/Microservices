const express = require('express');
const app = express();
require('dotenv').config();
const userController = require('./controllers/infoUser.controller');
const BlockCorsMiddleware = require('./middlewares/blockCors');

const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/profile/:id', BlockCorsMiddleware, userController.getProfileById);

app.listen(port, () => {
    console.log(`Server is running on http://${port}`);
});