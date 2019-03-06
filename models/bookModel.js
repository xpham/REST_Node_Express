const mongoose = require("mongoose");

// destructure syntax, retrieve only the Schema object from mongoose
const {Schema} = mongoose;

const bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});

module.exports = mongoose.model("Book", bookModel);