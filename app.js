const express = require('express');
const mongoose = require('mongoose');
const config = require('./api/configs/config');
const routes = require('./api/routes/router');
const morgan = require('morgan');
const Log = require('./api/models/log')


const app = express();

//connecting to the server
mongoose.connection.on('connected', () => {
    console.log("connected to server");
});
mongoose.connection.on('error', err => {
    console.log("error at mongoDB" + err);
});


// connecting to the DataBase
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the Account service database");
});

app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded(
    {
        extended: true,
        limit: '50mb'
    }
));




app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Autorization", 'Content-Security-Policy-Report-Only',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'",
        'Report-To',
        '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"http://192.168.117.168:8180/api/v1/__cspreport__"}],"include_subdomains":true}');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        res.status(200).json({});
    }
    next();
});


// *** THE LOG OF ALL THE REQUEST ***

app.use((req, res, next) => {


    res.on("finish", async () => {

        try {

            const log = new Log(
                {
                    _id: new mongoose.Types.ObjectId,
                    statusCode: res.statusCode,
                    methode: req.method,
                    url: {
                        url: req.url,
                        base: req.baseUrl,
                        originalUrl: req.originalUrl,
                    },
                    clientAddress: req.socket.remoteAddress,
                    header: {
                        rowHeaders: req.rawHeaders,
                        query: req.query,
                        params: req.params,
                        headers: req.headers,
                    },
                    body: req.body,
                    times: {
                        startTime: req._startTime,
                        addedAt: Date.now(),

                    }

                }
            );
            await log.save();
        } catch (error) {
            console.log("hey am here 1");
            res.status(500).json({
                message: "An error occured"
            })
        }
    })

    next()
})


// this containes all about our routes and middlewires
app.use('/api/v1', routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});



module.exports = app;