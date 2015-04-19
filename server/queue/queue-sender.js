var sender = {


    send: function (server, queueName, data, callback) {

        var bus = require('servicebus').bus({
            url: server
        });

        bus.use(bus.package());
        bus.use(bus.correlate());
        bus.use(bus.retry());

        data = JSON.parse(data);

        try {

            var t = bus.send(queueName, data, { ack: true});

            console.log(t);


            callback(null, data);

        } catch (ex) {

            console.log('EXCEPTION');

            callback(null, data);

        }

        bus.on('error', function (error) {

            console.log('error');

        });


    }


};

module.exports = sender;