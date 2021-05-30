const express = require('express'),
expressSession = require('express-session'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
http = require('http'),
cors = require('cors'),
ejs = require('ejs'),
connectFlash = require('connect-flash');
//
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(expressSession({
    secret:'secret_password',
    cookie:{
        maxAge:50000000,
        httpOnly:false
    },
    resave:false,
    saveUninitialized:false
}))
app.use(connectFlash());
app.use(cors());
//routes..
const Router = require('./routes/Router');

Router(app);

//let the router use the app
app.set('port', process.env.PORT || 9000);
//

app.listen(app.get('port'),()=>{
     console.log('Server running on port '+ app.get('port'));
 });
