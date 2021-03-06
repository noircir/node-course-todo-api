var mongoose = require('mongoose');

// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://monty:monty123@ds159651.mlab.com:59651/nodeplayground1'
// };

// mongoose.connect( db.localhost || db.mlab, { useNewUrlParser: true });

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('useCreateIndex', true);

mongoose.set('useFindAndModify', false);

module.exports = {
	mongoose: mongoose
}
