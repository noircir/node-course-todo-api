require ('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

// ES6 destructuring. Creating a local variable 'mongoose'
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');

var app = express();

const port = process.env.PORT;

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
		res.status(400).send();
	});
});


app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


// update todo items
app.patch('/todos/:id', (req, res) => {

	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
		// body.completedAt = new Date().toLocaleTimeString();
		console.log(body.completedAt);
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.status(200).send({todo: todo});
	}).catch((e) => {
		res.status(400).send();
	});

});


app.post('/users', (req, res) => {

	var body = _.pick(req.body, ['email', 'password']);

	var user = new User(body);
	
	user.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});




app.listen(port, () => {
	console.log(`Started up at port ${port}...`);
	console.log('=======================');
});

module.exports = {
	app: app
};