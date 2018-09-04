// Hashing and salting passwords before saving them in database

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$gMowCqe1HvJuUEqY3X816.gTqUL1.l89GcJXF1N.vB2wdXXy24cMm';

bcrypt.compare(password, hashedPassword, (err, res) => {
	// res is True or False
	console.log(res); 
});