var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });
// mongoose.connect('mongodb://nellie:mogorov12@ds159651.mlab.com:59651/nodeplayground1', { useNewUrlParser: true });

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://nellie:mogorov12@ds159651.mlab.com:59651/nodeplayground1'
};
mongoose.connect( db.localhost, { useNewUrlParser: true } || db.mlab, { useNewUrlParser: true });

module.exports = {
	mongoose: mongoose
}