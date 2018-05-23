/*
*  Customer schema 
*  The schema required the book schema as sub document
*/

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    books       = require('./book'); 

var customer = new mongoose.Schema({

    customer_id: {
        type: Number,
        index: 1,
        required: true,
    },
    custoner_name: {
        type: String , 
        required: true
    },
    categories : [String],
    books : [books]
},{collection : 'customers'})

/*
* Exporting the model of the scema 
*/
var Customer = mongoose.model('Customer' , customer);
module.exports = Customer;