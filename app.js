const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI')
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

// Here we request a model, in Mongoose a Model is responsible for creating and reading documents from MongoDB
// https://mongoosejs.com/docs/models.html
const Book = require('./models/bookModel');


bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.sender(err);
      }
      return res.json(books);
    });
  });

// GET Request
// bookRouter.route('/books')
//   .get((req, res) => {
//     const response = {
//       hello: 'This is my API'
//     };
//     res.json(response);
// });


app.use('/api', bookRouter);


// Root request
app.get('/', (req, res) => {
  res.send('Welcome to my Demon API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});



// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
