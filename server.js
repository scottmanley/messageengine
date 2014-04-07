#! /usr/local/bin/node --harmony

const
    azure = require('azure'),
    express = require('express'),
    app = express(),
    queueName = 'messagequeue',
    queueService = azure.createQueueService("messagequeue", "B5OuSJlUggdVNGQv6Wm9HFefd/gIYCQc2zwAPUbNKTsSaixNh9TEnMHZLxQt/Efcwd5fYJVTcdnWhG4d4wGOXw=="),
    port = process.env.PORT || 1337;

app.use(express.logger('dev'));
app.get('/api/:name', function(req, res) {

    queueService.peekMessages(queueName, function(error, messages){
        if(!error){
            res.json(200, {
                "hello": messages[0].messagetext
            });
        }
    });


});

queueService.createQueueIfNotExists(queueName, function(error){
    if(!error){
        queueService.createMessage(queueName, "Hello world!", function(error){
            if(!error){
                console.log("Message created");
            }
        });
    }
});

app.listen(port, function() {
    console.log("ready captain");
});