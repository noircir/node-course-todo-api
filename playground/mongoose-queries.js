const {ObjectID}= require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = ObjectId("5b5e631ee3f41a753e9d27c5");
var id = '5b5ca3c834e77e4b641d7e92';

if (!ObjectID.isValid(id)) {
	console.log('Id not valid');
}


// returns an array
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// // returns an object
// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// returns the same object
// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found')
// 	}
// 	console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
	 if(!user) {
	 	return console.log('User not found.')
	 }
	 // console.log(`Found user by id: ${user}`)
	 console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));