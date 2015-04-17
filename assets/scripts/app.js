(function(){
    'use strict';

    angular
        .module('waitstaff', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
            .when('/my-earnings', {
                templateUrl: 'templates/my-earnings.html',
                controller: 'EarningsCtrl'
            })
            .when('/new-meal', {
                templateUrl: 'templates/new-meal.html',
                controller: 'CalculatorCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
        }])
        .controller('HomeCtrl', function($rootScope){
        })
        .controller('EarningsCtrl', function($scope, $rootScope){
            $scope.datum = $rootScope.datum;

            //copy is not working ?
            $rootScope.reset = function() {
                angular.copy($rootScope.master, $rootScope.datum);
                // $rootScope.cancel();
            }
        })
        .controller('CalculatorCtrl', function($scope, $rootScope){

            $rootScope.master = {
                subtotal: 0,
                tip: 0,
                total: 0,
                tipTotal: 0,
                mealCount: 0,
                avgTip: 0
            };

            $rootScope.datum = {};
            angular.copy($rootScope.master, $rootScope.datum);

            $rootScope.submit = function() {
                if($scope.wsForm.$valid) {
                    $scope.datum.mealCount += 1;

                    $scope.datum.subtotal = $scope.bmp;
                    $scope.datum.tip = $scope.bmp * ($scope.tp / 100);
                
                    $scope.datum.tipTotal += $scope.datum.tip;

                    $scope.datum.total = ( $scope.bmp * ($scope.tr / 100) ) + $scope.bmp + $scope.datum.tip;
                    $scope.datum.avgTip = $scope.datum.tipTotal / $scope.datum.mealCount;
                }
            };

            $rootScope.cancel = function() {
                $scope.bmp = null;
                $scope.tp = null;
                $scope.tr = null;
                $scope.wsForm.$setPristine();   
                document.getElementById('bmp').focus();
            }

        });

}());