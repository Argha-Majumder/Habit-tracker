const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');   // used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const saasMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Using scss and before server start we need to place it first
app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

// Using static pages
app.use(express.static("./assets"));


// For adding layouts
app.use(expressLayouts);


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Habit Tracker',
    secret: 'Argha234',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://argha:argha234@ac-oaaqjwl-shard-00-00.0wvn1g6.mongodb.net:27017,ac-oaaqjwl-shard-00-01.0wvn1g6.mongodb.net:27017,ac-oaaqjwl-shard-00-02.0wvn1g6.mongodb.net:27017/?ssl=true&replicaSet=atlas-cu1ow8-shard-0&authSource=admin&retryWrites=true&w=majority',
            autoRemover: 'disabled'
        },
        function(err) {
            console.log('connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});