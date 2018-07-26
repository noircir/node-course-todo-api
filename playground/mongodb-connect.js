// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// object destructuring
// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('ToDoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, res) => {
	// 	if(err) {
	// 		return console.log('Unable to insert todo', err);
	// 	}
	// 	// res.ops is an array of all the documents inserted with added _id fields
	//  	// http://mongodb.github.io/node-mongodb-native/2.0/getting-started/quick-tour/
	// 	console.log(JSON.stringify(res.ops, undefined, 2));
	// });


	// db.collection('Users').insertOne({
	// 	name: 'Bob Marley',
	// 	age: 25,
	// 	location: "Barcelona"
	// }, (err, res) => {
	// 	if(err) {
	// 		return console.log('Unable to insert user', err);
	// 	}
		
	// 	console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
	// });




	client.close();
});