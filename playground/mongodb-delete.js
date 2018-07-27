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

	// deleteMany

	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
	// 	console.log('Deleted Todos: ');
	// 	console.log(res);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// });

	// db.collection('Users').deleteMany({name: 'Bob Marley'}).then((res) => {
	// 	console.log('Deleted Users: ');
	// 	console.log(res);
	// }, (err) => {
	// 	console.log('Unable to delete todos', err)
	// });

	// deleteOne 

	// db.collection('Todos').deleteOne({text: 'lunch'}).then((res) => {
	// 	console.log('Deleted Todos: ');
	// 	console.log(JSON.stringify(res, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to delete todos', err)
	// });

	// findOneAndDelete

	db.collection('Users').findOneAndDelete({_id: ObjectID('5b55300cc90b890dacbe86da')}).then((res) => {
		console.log('Deleted Users: ');
		// console.log(JSON.stringify(res, undefined, 2));
		console.log(res);
	}, (err) => {
		console.log('Unable to delete users', err)
	});


	client.close();
});