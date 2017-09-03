const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use( (req, res, next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs');
});


app.use(express.static(__dirname + '/public'));

app.get('/', (request,response) =>{
    // response.send({
    //     name: 'Akash',
    //     likes: [
    //         'photography',
    //         'driving',
    //         'gyming'
    //     ]
    // });

    response.render('home.hbs', {
        homeTitle: 'Home Page',
        pageTitle: 'Welcome Page',
        currentYear: new Date().getFullYear()

    });
});

app.get('/about', (request,response) =>{
    response.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
    // response.send('<h1>About Page...</h1>')
});

app.get('/bad', (request,response) =>{
    response.send({
        errorMessage: 'Unable to process request'
    });
});


app.listen(3000, () =>{
    console.log('Server is up on the port 3000');
});
