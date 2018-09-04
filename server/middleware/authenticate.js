var {User} = require ('./../models/user');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		// req.user equals the user we just found
		req.user = user;
		req.token = token;
		next();

	}).catch((e) => {
		// 401 = unauthorized
		res.status(401).send();
	});
}; 

// Developing 'authenticate' middleware 

// app.get('/users/me', (req,res) => {
// 	var token = req.header('x-auth');

// 	User.findByToken(token).then((user) => {
// 		if (!user) {
// 			return Promise.reject();
// 		}

// 		res.send(user);
// 	}).catch((e) => {
// 		// 401 = unauthorized
// 		res.status(401).send();
// 	});
// });

module.exports = {authenticate}