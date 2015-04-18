(function () {
    'use strict';

    angular
        .module('common')
        .factory('queueService', queueService);

    queueService.$inject = ['$http', 'constants_urls'];

    function queueService($http, constants_urls) {

        var service = {
            sendMessage: sendMessage
        };

        return service;

        function sendMessage(server, queueName, data) {

            var promise = $http.post(constants_urls.sendMessage, {
                server: server,
                queueName: queueName,
                data: JSON.stringify(data)
            });

            return promise;
        }
    }

})();