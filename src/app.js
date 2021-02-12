const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000;
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
        name: 'Manthan Panchal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Manthan Panchal',
        title: 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Manthan Panchal',
        title: 'About'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address && !(req.query.longitude && req.query.latitude)) {
        return res.send({
            error: "You must provide address term"
        });
    }
    if (req.query.address) {
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

        });
    } else {
        forecast(req.query.latitude, req.query.longitude, (error, forecastdata) => {
            if (error) return res.send({ error });
            res.send({
                forecast: forecastdata
            });
        });
    }

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'Manthan Panchal',
        title: 'Error',
        errorMessage: 'Help artical Not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Manthan Panchal',
        errorMessage: 'Page Not found'
    });
});
app.listen(port, () => {
    console.log("Server Started......", "Listen on port 3000");
});