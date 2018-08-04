const {ObjectID}= require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
// 	console.log(res);
// });

// returns removed document
// Todo.findOneAndRemove(({_id: }))

Todo.findByIdAndRemove('5b639b313907dc81cec7f89f').then((doc) => {
	console.log(doc);
});