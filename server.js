#! /usr/local/bin/node --harmony

const
    express = require('express'),
    app = express(),
    port = process.env.PORT || 1337;;

app.use(express.logger('dev'));
app.get('/api/:name', function(req, res) {
    res.json(200, {
        "hello": req.params.name
    });
});

app.listen(port, function() {
    console.log("ready captain");
});