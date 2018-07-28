var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// var newTodo = new  Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then(() => {
// 	console.log('Saved todo', newTodo);
// }, (e) => {
// 	console.log('Unable to save todo');
// })

// var newTodo2 = new Todo({
// 	text: 'Ride a bike',
// 	completed: false,
// 	completedAt: 8
// });

// var newTodo2 = new Todo({
// 	text: "Play tennis    "
// });

// newTodo2.save().then(() => {
// 	console.log('Saved todo: ', newTodo2);
// }, (e) => {
// 	console.log(e);
// });

// Challenge
 var User = mongoose.model ('User', {
 	email: {
 		type: String,
	 	required: true,
	 	trim: true, 
	 	minlength: 1
 	}
 });

 var Kevin3 = new User({
 	email: "Kevin448@gmail.com"
 })

 Kevin3.save().then(() => {
 	console.log(Kevin3);
 }, (e) => {
 	console.log(e);
 });