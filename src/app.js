const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Directory Path
const publicDirPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../template/views');
const particalPath = path.join(__dirname, '../template/partials');


//Setting handlerbar and template path
app.set('views', templatePath);
app.set('view engine', 'hbs');
hbs.registerPartials(particalPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'max'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'max',
        title: 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'max',
        title: 'About'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address term"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        // console.log(latitude, longitude)
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) return res.send({ error });
            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            });

            // console.log('location :' + location);
            // console.log(forecastdata);
        });

    })

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'max',
        title: 'Error',
        errorMessage: 'Help artical Not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'max',
        errorMessage: 'Page Not found'
    });
});
app.listen(3000, () => {
    console.log("Server Started......", "Listen on port 3000");
});