// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)


MongoClient.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// 'client' is needed because of MongoDB does it now this way
	const db = client.db('ToDoApp');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectId("5b552fbdadfcd20da3db9242")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
		
	// }, {
	// 	returnOriginal: false
	// }).then((res) => {
	// 	console.log(res);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectId('5b53d42b6eb48d1c07227334')
	}, {
		$set: {
			location: 'Bora Bora'
		},
		$inc: {
			age: 1
		}
	},{
		returnOriginal: false
	}).then((res) => {
		console.log(res);
	});


	client.close();
});