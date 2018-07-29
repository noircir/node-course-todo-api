const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Root-level hook in Mocha, outside all 'describe' blocks
// It will run before each test

beforeEach('Root-level Mocha hook', (done) => {
	// console.log('Emptying todos collection...')
	Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Play with the cats';

		request(app)
		.post('/todos')
		// text will be converted to JSON object by the supertest library
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})

		// check if this todo was saved in todos db collection
		.end((err, res) => {
			if (err) {
				// if error exists, the test will fail
				return done(err);
			}

			Todo.find().then((todos) => {
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
				expect(todos.length).toBe(0);
				done();
			}).catch((e) => done(e));
		});
	});
});