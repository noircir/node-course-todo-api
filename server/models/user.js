const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// A Mongoose ‘schema’ is a document data structure (or shape of the document) 
// that is enforced via the application layer.

// ‘Models’ are higher-order constructors that take a schema 
// and create an instance of a document equivalent to records 
// in a relational database.


var UserSchema  = new mongoose.Schema({
 	email: {
 		type: String,
	 	required: true,
	 	trim: true, 
	 	minlength: 1,
	 	unique: true,
	 	validate: {
	 		// validator: (value) => {
	 		// 	return validator.isEmail(value);
	 		// },
	 		validator: validator.isEmail,  // the same as above
	 		message: '{VALUE} is not a valid email'
	 	}
 	},
 	password: {
 		type: String,
 		required: true,
 		minlength: 6
 	}, 
 	// our own information for header: 'access' for different authorisation types
 	tokens: [{
 		access: {
 			type: String,
 			required: true
 		},
 		token: {
 			type: String,
 			required: true
 		}
 	}]
});

// These are going to be instance methods.
// Using regular (not arrow) functions because arrow functions 
// do not bind the "this" keyword.

// toJSON is automatically called when we respond to the express request with res.send. 
// That converts our object to a string by calling JSON.stringify. 
// JSON.stringify is what calls toJSON.

UserSchema.methods.toJSON = function() {
	// Rename 'this' to make clear what we are manipulating with.
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';

	// This line creates a new token with a new random salt.
	// Salt will be eventually moved to configuration variables.

	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	// Instead of "push" array method, "concat" method (mongodb issues).

	user.tokens = user.tokens.concat([{access, token}]);

	// This line re-saves the user with the newly created token.
	// The token inside the callback is for further use by the server.js file;
	// return user.save() is the function's (method's) return.

	return user.save().then(() => {
		return token;
	});
};

var User = mongoose.model ('User', UserSchema);

module.exports = {User: User}