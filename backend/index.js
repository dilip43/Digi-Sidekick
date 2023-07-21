const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// for testing purpose
app.use('/test', (req, res) => {
	res.send('Hello world!');
});

const user = require('./controller/user.js');
const admin = require('./controller/admin.js');

app.use('/api/v1/admin', admin);

app.use('/api/v1/users', user);

// database connection
mongoose
	.connect('mongodb://127.0.0.1:27017/DigiSidekick', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((data) => {
		console.log(`mongodb connected with server ${data.connection.host}`);
	})
	.catch((err) => {
		console.log(err);
	});

// server creation
app.listen(process.env.PORT || 8000, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});
