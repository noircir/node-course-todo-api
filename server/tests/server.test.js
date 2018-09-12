const expect = require('expect');
const request = require('supertest');
var {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


// populate before each 'it should'

beforeEach('Root-level Mocha hook', populateTodos);
beforeEach(populateUsers);

// 'describe', 'it should' come from Mocha.
// 'request' comes from supertest (high-level abstraction for testing http).
// 'expect' comes from expect

describe('POST /todos', () => { 

	it('should create a new todo', (done) => {
		var text = 'Play with the cats';

		request(app)
		.post('/todos')
		// text will be converted to JSON object by the supertest library
		.send({text})
		.expect(200)
		// custom assertion
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})

		// check if this todo was saved in todos db collection
		.end((err, res) => {
			if (err) {
				// if error exists, the test will fail
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();

			}).catch((e) => done(e));
		});
	});

	it('should not create todo with invalid body data', (done) => {

		var emptyString = '';

		request(app)
		.post('/todos')
		.send({emptyString})
		.expect(400)
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos', () => {

	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		// .end(done)
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();
			}
		});
	});
});

describe('GET /todos/:id', () => {

	it('should return todo doc', (done) => {

		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end((err, res) => {
			if (err) {
				return done(err)
			} else {
				return done()
			}
		});
	});


	it('should return 404 if todo not found', (done) => {

		var hexId = new ObjectId().toHexString();

		request(app)
		.get('/todos/' + hexId)
		.expect(404)
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();	
			}
		});
	});

	it('should return 404 for non-object ids', (done) => {
	
		request(app)
		.get('/todos/123')
		.expect(404)
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();	
			}
		});
	});
});

describe('DELETE /todos/:id', () => {

	var hexId = todos[1]._id.toHexString();

	it('should remove a todo', (done) => {

		request(app)
		.delete('/todos/' + hexId)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			Todo.findById(hexId).then((doc) => {
				expect(doc).toBeFalsy();
				done();

			}).catch((e) => done(e));
		});
	});

	it('should return 404 if todo not found', (done) => {

		var hexId = new ObjectId().toHexString();

		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();	
			}
		});
	});

	it('should return 404 if object id is invalid', (done) => {

		request(app)
		.get('/todos/123')
		.expect(404)
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();	
			}
		});
	});
});



describe('PATCH /todos/:id', () => {
	it('should update a todo', (done) => {

		var hexId = todos[1]._id.toHexString();
		var newText = 'Fly a plane';

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			text: newText, 
			completed: true
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(hexId);
			expect(res.body.todo.text).toBe(newText);
			expect(res.body.todo.completed).toBe(true);
			expect(typeof res.body.todo.completedAt).toBe('number');
		})
		.end(done);

	});

	it('should clear completedAt when todo is not completed', (done) => {

		var hexId = todos[1]._id.toHexString();
		var newText = 'Fly a plane';

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			text: newText, 
			completed: false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(newText);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done);
	});
});

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {

		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);
		})
		.end(done);
	});

	it('should return 401 if not authenticated', (done) => {

		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res) => {
			expect(res.body).toEqual({});
		})
		.end(done);
	});
});


describe ('POST /users', () => {

	it('should create a user', (done) => {
		var email = 'example@example.com';
		var password = '123mnb!';

		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeTruthy();
			expect(res.body._id).toBeTruthy();
			expect(res.body.email).toBe(email);
		})
		.end((err) => {
			if (err) {
				return done(err);
			}

			User.findOne({email}).then((user) => {
				expect(user).toBeTruthy();
				console.log(user.toJSON());
				expect(user.password).not.toBe(password);
				done();
			}).catch((e) => done(e));
		});
	}); 

	it('should return validation errors if request invalid', (done) => {

		var email = 'and';
		var password = '123';

		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	}); 

	it('should not create user if email in use', (done) => {

		var email = users[0].email;
		var password = '123hello';

		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	}); 
});

describe('POST /users/login', (done) => {

	it('should login user and return auth token', (done) => {
		request(app)
		.post('/users/login')
		.send({
			email: users[1].email,
			password: users[1].password
		})
		.expect(200)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeTruthy();
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			User.findById(users[1]._id).then((user) => {
				// console.log(user);
				expect(user.tokens[0]).toMatchObject({
					access: 'auth',
					token: res.headers['x-auth']
				});
				done();
			}).catch((e) => done(e));
		});
	});

	it('should reject invalid login', (done) => {

		var wrongPasswd = '567uutt'; 

		request(app)
		.post('/users/login')
		.send({
			email: users[1].email,
			password: wrongPasswd
		})
		.expect(400)
		.expect((res) => {
			expect(res.headers['x-auth']).toBeFalsy();
		})
		.end((err) => {
			if (err) {
				return done(err);
			} 

			User.findById(users[1]._id).then((user) => {
				expect(user.tokens.length).toBe(0);
				done();
			}).catch((e) => done(e));
		});
	});

});



