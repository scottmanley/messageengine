var azure = require('azure');
var express = require('express')
var app = express();
var queueName = 'messagequeue';
var queueService = azure.createQueueService("messagequeue", "B5OuSJlUggdVNGQv6Wm9HFefd/gIYCQc2zwAPUbNKTsSaixNh9TEnMHZLxQt/Efcwd5fYJVTcdnWhG4d4wGOXw==");
var port = process.env.PORT || 1337;

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