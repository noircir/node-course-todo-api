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

// =============================
// Instance methods.
// =============================
// Using regular functions because arrow functions do not bind 'this'.

// Overriding 'toJSON' to limit information sent back to client.
// res.send calls JSON.stringify(), which in turn calls toJSON().

UserSchema.methods.toJSON = function() {
	// Rename 'this' to make clear what we are manipulating with.
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';

	// Create a new token with salt (salt will be moved to config variables).

	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	// Add new token to user's collection of tokens. 'concat' instead of 'push' (mongodb issues).

	user.tokens = user.tokens.concat([{access, token}]);

	// Re-save the user with the newly created token.
	// Return the user and the generated token.

	return user.save().then(() => {
		return token;
	});
};

var User = mongoose.model ('User', UserSchema);

module.exports = {User: User}