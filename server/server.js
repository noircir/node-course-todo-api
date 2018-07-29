var express = require('express');
var bodyParser = require('body-parser');

// ES6 destructuring. Creating a local variable 'mongoose'
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// bodyParser.json() returns a function that we need to give to express.
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});

});



app.listen(3000, () => {
	console.log('Started on port 3000...');
});

module.exports = {
	app: app
};