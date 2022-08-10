const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const dotenv = require('dotenv');
const errorHandler = require('./middlware/errorMiddleware.js');
dotenv.config();
const PORT = process.env.PORT || 7007;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/goals', require('./routers/goalRouter'));
app.use('/api/v1/users', require('./routers/userRouter'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => res.send('Please switch to production mode'));
}

app.use(errorHandler); // need to be after Router use

app.listen(PORT, () => console.log(`HI! You may come in here: http://localhost:${PORT}`.magenta));
connectDB();
