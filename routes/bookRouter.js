const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {

  const bookRouter = express.Router();
  const controller = booksController(Book);

  // GET Request with query string filter
  bookRouter.route('/books')
    .get(controller.get)
    .post(controller.post);

  // MIDDLEWARE (it's like a java chaining filter) built to avoid repetition, it intercepts every request '/books/:id'
  // and do some treament and get onto the next middleware otherwise executes the GET, PUT or else...
  bookRouter.use('/books/:id', (req, res, next) => {
      Book.findById(req.params.id, (err, book) => {
        if (err) {
          return res.sender(err);
        }
        // book from db will be put into req.book
        if (book) {
          req.book = book;
          return next();
        }
        return res.sendStatus(404);
      });
    });

  // GET Request getting item by ID
  bookRouter.route('/books/:id')
    .get((req, res) => res.json(book))
    .put((req, res) => {
      const {book} = req; // destruturing assingment

      // from payload to model
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const {book} = req; // destruturing assingment

      // from payload to model
      // iteration key-value because... we do not want to update the id
      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      })

      book.save((err) => {
        if (err) {
          res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.delete((err) => {
        if (err) {
          res.send(err);
        }
        return res.sendStatus(204);
      });
    })
  ;

  return bookRouter;
}

module.exports = routes;