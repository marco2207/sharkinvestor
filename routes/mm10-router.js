var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
var moment = require('moment');

router.get('/', function(req, res){
    var ticker = req.ticker_config;
    console.log('Search for ticker: ' + ticker.value);
    var tenDateArray = [];
    let sum = 0;
    let loopCheck = 0;

    let tenValueArray = [];

 /*  for (x=0; x<tenDateArray.length; x++) {
        
        var history = yahooFinance.historical({
            symbol: ticker.value,
            from: tenDateArray[x],
            to: tenDateArray[x]
            }, function(err, history) {
                console.log(err);
                //Return Value
                sum += history[0].close;
                loopCheck += 1;
                console.log("Sum value: " + sum);
                //res.send('History Value for Ticker ' + history[0].close);    
                console.log("Value of loopCheck in function:" + loopCheck);
                if (loopCheck == 10) {
                    sum = sum / 10;
                    res.send('History Value for Ticker ' + sum);
                };
        });
        console.log("X value is:" + x);
        
    } */

    
    // Get first day of the month for previous 10 (api use this for the closure on last day of the month)
    for (i = 0; i < 10; i++) {
        var startdate = moment();
        startdate = startdate.endOf('month');
        startdate = startdate.subtract(i + 1, "months");
        console.log("Day value is: " + startdate.day());
          if (startdate.day() == 0) {
              startdate = startdate.subtract(1, "days");
              startdate = startdate.format("YYYY-MM-DD");
              console.log("## INSIDE IF with DAY=0 " + startdate);
              tenDateArray.push(startdate);
          } else if (startdate.day() == 1) {
              startdate = startdate.subtract(2, "days");
              startdate = startdate.format("YYYY-MM-DD");
              console.log("## INSIDE IF with DAY=1 " + startdate);
              tenDateArray.push(startdate);
          } else {
              startdate = startdate.format("YYYY-MM-DD");
              tenDateArray.push(startdate);
              console.log ("TenDate Array --> " + tenDateArray.toString())
          }
      };

      var dateRecursive = function(n) {
        if (n < tenDateArray.length) {
            var history = yahooFinance.historical({
                    symbol: ticker.value,
                    from: tenDateArray[n],
                    to: tenDateArray[n]
                    }, function(err, history) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Value of date: " + tenDateArray[n]);
                            console.log(JSON.stringify(history));
                            tenValueArray.push(history);
                            console.log("tenValueArray is: " + tenValueArray);
                            
                            //Return Value
                            if(history.length > 0) {
                                console.log("Value of APPL is: " + history[0].close);
                                sum += history[0].close;
                                console.log("Sum value: " + sum + " " + " N value: " + n);
                                dateRecursive(n + 1);
                                // Return single value to homePageCtrl.js
                                /* if (n == 9) {
                                    sum = sum / 10;
                                    res.send('History Value for Ticker ' + sum);
                                }; */
                                if (n == 9) {
                                    res.send(tenValueArray);
                                };
                            }
                        }
                    });
            }
        }
    
      // start the recursive function
      dateRecursive(0);


});

router.post('/', function(req, res){
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;