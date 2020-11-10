var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res){
    var ticker = req.ticker_config;
    console.log('@@@ Search for ticker: ' + ticker.value);
    var quote = yahooFinance.quote({
        symbol: ticker.value,
        modules: ['price']       // optional; default modules (price,)
      }, function(err, quote) {
        console.log(err);
        // Transform object in String
        var quoteString = JSON.stringify(quote);
        //Return Value
        res.send("Value for ticker is: " + quote.price.regularMarketPrice);
      });
      
});

router.post('/', function(req, res){
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;