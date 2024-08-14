
const mongoose = require('./connection.js');

const TrailerSchema = new mongoose.Schema({
    trNumber: {type: String, require: true},
    issues: {type: String, require: true},
    isComplete: Boolean,
    comments: String
});

const Trailer = mongoose.model('trailers', TrailerSchema);

module.exports = Trailer;