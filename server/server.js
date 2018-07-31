var express = require('express');
var bodyParser = require('body-parser');

// ES6 destructuring. Creating a local variable 'mongoose'
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');

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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({
			todos:todos
		});
	}, (e) => {
		res.status(400).send(e);
	});
});


app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	// validate id
		// 404 - send back empty body

	if (!ObjectId.isValid(id)) {
		console.log('Id not valid');
		return res.status(404).send();
	}

	// find by id
		// success
			// if todo - send back
			// if no todo - sen back 404 with empty body
		// error
			// 400 - send empty body back
	Todo.findById(id).then((todo) => {
		if (!todo) {
			console.log('Todo not found in db');
			return res.status(404).send();
		}
		// sending todos as an object has an advantage of accessing properties
		res.status(200).send({todo: todo});
	}).catch((e) => {
		console.log('Bad request');
		console.log(e)
		res.status(400).send();
	});
});


app.listen(3000, () => {
	console.log('Started on port 3000...');
	console.log('=======================');
});

module.exports = {
	app: app
};