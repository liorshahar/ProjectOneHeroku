var express = require('express'),
    app = express(),
    Controller = require('./controller/customer.md'),
    url = require('url'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;



var customersService = new Controller();
// BodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/assets', express.static(`${__dirname}/public`));



// Catch all request
app.all('*', (req, res, next) => {
    console.log(`get.all *  middleware + ${req.path}`);
    next();
})

// Main index
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});


// Return all customers
app.get('/getAllCustomers', (req, res) => {
    console.log('GET request: /getAllCustomers');
    customersService.getAllCustomers()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('db is empty');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllCustomers');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});


// Return customer books by customer id
app.post('/getCustomerBooks', (req, res) => {
    console.log('POST request: /getCustomerBooks');
    var customerId = req.body.customer_id;
    console.log(`customer id: ' ${customerId}`);
    customersService.getCustomerBooks(customerId)
      .then(
          (data) => {
              if (!data.length) {
                  console.log('no data return');
                  res.status(404).json('customer not found');
              } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getCustomerBooks');
                    res.status(200).json(data);
              }
          }, (error) => {
              console.log(error);
          });
});


// Return the book that customer want to cancel by 
// customer_id and book_id
app.get('/getCustomerCanceldBook/:customerId/:bookId', (req, res) => {
    console.log('GET request: /getCustomerCanceldBook');
    var customerId = req.params.customerId;
    var bookId     = req.params.bookId;
    console.log(`customer id : ${customerId}\nbook id: ${bookId}`);
    customersService.getCustomerCanceldBook(customerId , bookId)
      .then(
          (data) => {
              if (!data.length) {
                  console.log('no data return');
                  res.status(404).json('book id or customer id not found');
              } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getCustomerBooks');
                    res.status(200);
                    res.json(data);
              }
          }, (error) => {
              console.log(error);
          });
});

app.listen(port);
console.log(`listening on port ${port}`);