(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['queueService', '$rootScope'];

    function homeController(queueService, $rootScope) {

        var vm = this;
        vm.sendButtonText = "Send Message";
        vm.session = null;
        vm.input = '{ \n "test":"test" \n}';
        vm.isValidJson = false;
        vm.server = "amqp://localhost:5672";
        vm.queueName = "";
        vm.alerts = [];

        activate();

        function activate() {

            console.log('activation');

        }

        vm.closeAlert = function (index) {

            vm.alerts.splice(index, 1);

        };

        vm.sendMessage = function () {

            console.log(vm.session.getValue());
            console.log(vm.server);
            console.log(vm.queueName);

            queueService.sendMessage(vm.server, vm.queueName, vm.session.getValue())
                .success(function () {

                    vm.alerts.push({message :'message successfully sent!', type: "success"});
                    console.log('success');
                })
                .error(function () {
                    console.log('error');
                })

        };


        vm.editorLoaded = function (editor) {

            vm.session = editor.getSession();

            vm.session.on('changeAnnotation', function (data, editor) {

                if (editor && editor.$annotations) {

                    $rootScope.$apply(function () {
                        vm.isValidJson = Object.keys(editor.$annotations).length === 0;
                    });

                }
            });
        }

    }

})();