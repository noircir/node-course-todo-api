// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// 'client' is needed because of MongoDB does it now this way
	const db = client.db('TodoApp');

	db.collection('Todos').find({

		// _id is now an objectID deconstructed above (line 2)
		_id: new ObjectID('5b5545c1307ea8d750d60dd1')
		// toArray() returns Promise; it is async, do some action with the result
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err)
	});

	client.close();
});