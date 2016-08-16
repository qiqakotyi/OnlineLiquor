// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use("/assets", express.static(__dirname + "/assets"));
app.use("/app/assets", express.static(__dirname + "/app/assets"));
app.use("/app", express.static(__dirname + "/app"));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//app.get('/scrape', function (req, res) {
//
//    //All the web scraping magic will happen here
//    //url = 'http://www.imdb.com/title/tt1229340/';
//    //job_search_content
//    url = 'http://www.careers24.com/jobs/lc-johannesburg/?sort=dateposted&ref=sbj';
//    request(url, function (error, response, html) {
//
//        // First we'll check to make sure no errors occurred when making the request
//
//        if (!error) {
//            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
//
//            var $ = cheerio.load(html);
//
//            // Finally, we'll define the variables we're going to capture
//
//            var title, release, rating;
//            var json = {title: "", release: "", rating: ""};
//            // We'll use the unique header class as a starting point.
//
//            $('.job_search_content').filter(function(){
//                // Let's store the data we filter into a variable so we can easily see what's going on.
//                var data = $(this);
//                title = data.children().first().text();
//                release = data.children().last().children().text();
//
//                // Once we have our title, we'll store it to the our json object.
//                json.title = title;
//                json.release = release;
//            })
//            $('.star-box-giga-star').filter(function(){
//                var data = $(this);
//
//                // The .star-box-giga-star class was exactly where we wanted it to be.
//                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further
//
//                rating = data.text();
//
//                json.rating = rating;
//            })
//
//        }
//        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//
//            console.log('File successfully written! - Check your project directory for the output.json file');
//
//        })
//        res.send('Check your console!')
//
//    }) ;
//})

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
exports = module.exports = app;