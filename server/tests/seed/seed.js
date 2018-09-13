const {ObjectId} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();


const users = [{
	_id: userOneId,
	email: 'sigourney@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'dmitri@example.com',
	password: 'userTwoPass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userTwoId.toHexString(), access: 'auth'}, 'abc123').toString()
	}]
}];


const todos = [{
	_id: new ObjectId(),
	text: 'First test todo',
	_creator: userOneId
}, {
	_id: new ObjectId(),
	text: 'Second test todo',
	comleted: true,
	completedAt: 333,
	_creator: userTwoId
}];

const populateTodos = (done) => {

	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

// Passwords have to be hashed so we cannot just 'insertMany'
const populateUsers = (done) => {

	User.remove({}).then(() => {

		// password hashing happens before 'save'
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		// waiting for all the saves to complete
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};