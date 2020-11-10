const express = require('express')
var path = require('path');
const app = express();
const yahooFinance = require('yahoo-finance');
const PORT = process.env.PORT || 5000
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup public folder
app.use(express.static('./public'));

// Manage routes
app.get('/',function (req, res) {
    res.render('pages/home')
});

var tickerValue = require('./routes/value-router.js');
var tickerMM10 = require('./routes/mm10-router.js');


//Return last value given the Ticker ex. http://localhost:3000/ticker/APPL/value
app.use('/ticker/:ticknum/value', function (req, res, next) {
    req.ticker_config = {
        name: 'ticknum',
        value: req.params.ticknum
    };
    next();
}, tickerValue);


//Return last value given the Ticker ex. http://localhost:3000/ticker/APPL/mm10
app.use('/ticker/:ticknum/mm10', function (req, res, next) {
    req.ticker_config = {
        name: 'ticknum',
        value: req.params.ticknum
    };
    next();
}, tickerMM10);


app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));
