

var sender = {

    send: function (server, queueName, data) {

        console.log(server);

        var bus = require('servicebus').bus({
            url: server
        });

        bus.use(bus.package());
        bus.use(bus.correlate());
        bus.use(bus.retry());

        bus.send(queueName, JSON.parse(data), { ack: true} );

    }


};

module.exports = sender;