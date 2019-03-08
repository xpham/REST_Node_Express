function booksController(Book) {

  function get(req, res) {
    const book = new Book(req.body);

    // destructuring assignment of req.query to new object {} including query
    //const {query} = req; // query = { genre: fantasy} if url query is genre=fantasy

    // genre = "" or any wrong filters like fdds=fdds
    const query = {};
    // we narrow it down to the desired filter, if genre exists create an attribute "genre" on query
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.sender(err);
      }
      return res.json(books);
    });
  }

  function post(req, res) {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  }

  return {get, post};
}

module.exports = booksController;