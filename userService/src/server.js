const express = require('express');
const app = express();
require('dotenv').config();
const userController = require('./controllers/user.controller');
const BlockCorsMiddleware = require('./middlewares/blockCors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/user/:id', BlockCorsMiddleware, userController.getUserById);

app.post('/api/login', userController.login);

app.post('/api/check', userController.check);

app.listen(port, () => {
    console.log(`Server is running on http://${port}`);
});