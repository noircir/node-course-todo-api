// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)


MongoClient.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// 'client' is needed because of MongoDB does it now this way
	const db = client.db('ToDoApp');

	db.collection('Users').find({

		// _id is now an objectID deconstructed above (line 2)
		// _id: new ObjectID and _id= ObjectID - both work
		// _id: ObjectID('5b5545c1307ea8d750d60dd1')
		// completed: true
		name: 'Bob Marley'
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err)
	});

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// });


	// Challenge

	// db.collection('Todos').find({name: 'Bob'}).toArray().then((res) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(res, undefined, 2));
	// 	// console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// });


	client.close();
});