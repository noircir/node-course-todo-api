const expect = require('expect');
const request = require('supertest');
var {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectId(),
	text: 'First test todo'
}, {
	_id: new ObjectId(),
	text: 'Second test todo'
}]

// Root-level hook in Mocha, outside all 'describe' blocks
// It will run before each test

beforeEach('Root-level Mocha hook', (done) => {
	// populating with seed todos
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

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
		.send('')
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
		.send('')
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
		.delete(`/todos/${hexId}`)
		.expect(404)
		.send('')
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
		.send('')
		.end((err, res) => {
			if (err) {
				return done(err);
			} else {
				return done();	
			}
		});
	});
});



