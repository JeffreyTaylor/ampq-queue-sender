(function () {
    'use strict';

    angular
        .module('app', ['ngAnimate', 'ui.router', 'common', 'ui.bootstrap', 'validation', 'validation.rule', 'ui.ace'])
        .config(moduleConfig)
        .constant('_', window._); // adding lodash as a constant

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function moduleConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'app/home/template.html',
                controller: 'homeController as vm'
            });
    }

})();