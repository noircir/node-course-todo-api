var express = require('express');
var bodyParser = require('body-parser');

// ES6 destructuring. Creating a local variable 'mongoose'
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');

var app = express();

const port = process.env.PORT || 3000;

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

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
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


app.listen(port, () => {
	console.log(`Started up at port ${port}...`);
	console.log('=======================');
});

module.exports = {
	app: app
};