/*
*   book schema (sub document of customer)
*/

var mongoose = require('mongoose');
    Schema   = mongoose.Schema;

    book = new mongoose.Schema({
    book_id:{
        type: String,
        index: 1,
        required: true,
    },
    book_autor:{
        type: String , 
        required: true
    },
    book_cat : {
    type: String , 
    required: true 
    },
    book_name:{
        type: String , 
        required: true
    },

},{collection : 'customers'});

/*
* Exporting the model of the scema 
*/
module.exports = book;