const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// // Instead of data, we will be sending the data + hash.
// // To prevent altering data and hash, we will salt the hash.
// // Salt would be different every time, some random generated value.
// // If client tries to alter data, their hashes won't be the same as salted hash.


// var token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // Validating if the token was not manipulated:

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Don\'t trust!');
// }