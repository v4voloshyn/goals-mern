const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config()
const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/goals', require('./routers/goalRouter'))

app.listen(PORT, () => console.log(`HI! You may come in here: http://localhost:${PORT}`.magenta))

