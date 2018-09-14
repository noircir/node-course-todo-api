var env = process.env.NODE_ENV || 'development';

// on Heroku, process.env.NODE_ENV = 'production'

// load file with config data; the file will not be included in git repository
if (env === 'development' || env === 'test') {

	// 'require' statement automatically parses JSON file
	var config = require('./config.json');
	// extract config objects for the current environment
	var envConfig = config[env];

	// console.log(Object.keys(envConfig));
	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}

// if (env === 'development') {
// 	process.env.PORT = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
// 	process.env.PORT = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }

console.log('=======================');
console.log('Using env: ', env);
console.log('=======================');