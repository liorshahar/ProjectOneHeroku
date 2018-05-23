var Customer = require('../db.schemes/customer'),
    consts   = require('../consts'),
    //Import the mongoose module
    mongoose = require('mongoose'),
    //Set up default mongoose connection
    mongoDB = consts.MLAB_KEY;


console.log('connection to db');
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = class CustomersService{
    
    /*
    * Return the collection of customers from db 
    */
    getAllCustomers(){
        return new Promise((resolve , reject)=>{
            Customer.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('<-getAllCustomers->\n' + data);
                    resolve(data);
                }
            });
        });

    }


     /*
     *  Return costomer books by customer id
     */   
     getCustomerBooks(customerId){
        return new Promise((resolve , reject)=>{
            console.log(customerId);
            Customer.find({customer_id : customerId} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('<-getCustomerBooks->\n');
                    resolve(data);
                }
            });
        });
  
    }
 
    /*
    *  Return book that customer want to cancel
    */
    getCustomerCanceldBook(customerId , bookId){
      return new Promise((resolve , reject)=>{
        console.log(customerId , bookId);
            Customer.find({
                    'customer_id': customerId ,
                     'books.book_id' : bookId } ,'books', (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    var book =  JSON.parse(JSON.stringify(data));
                        book = getObjects(book , 'book_id' , bookId);
                        
                    console.log('<-getCustomerBooks->\n' + book);
                    resolve(book);
                }
            });
        });
    }


}

/*
*  function from : https://gist.github.com/iwek/3924925#file-find-in-json-js-L23
*  return an array of objects according to key, value, or key and value matching
*/
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
