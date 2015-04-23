(function(){
    'use strict';

    angular
        .module('waitstaff', ['ngRoute', 'ngAnimate'])
        .run(function($rootScope, $location, $timeout) {
            $rootScope.$on('$routeChangeError', function() {
                $location.path("/error");
            });
            $rootScope.$on('$routeChangeStart', function() {
                $rootScope.isLoading = true;
            });
            $rootScope.$on('$routeChangeSuccess', function() {
              $timeout(function() {
                $rootScope.isLoading = false;
              }, 2500);
            });
        })
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl',
                active: 'home'
            })
            .when('/my-earnings', {
                templateUrl: 'templates/my-earnings.html',
                controller: 'EarningsCtrl',
                active: 'earnings'
            })
            .when('/new-meal', {
                templateUrl: 'templates/new-meal.html',
                controller: 'CalculatorCtrl',
                active: 'calculator'
            })
            .otherwise({
                redirectTo: '/'
            })
        }])
        .controller('HomeCtrl', function($rootScope, $route){
            $rootScope.route = $route;
        })
        .controller('EarningsCtrl', function($scope, $rootScope, $route){
            $rootScope.route = $route;
            $scope.reset = function() {
                angular.copy($rootScope.master, $rootScope.datum);
                // $rootScope.cancel();
            }

        })
        .controller('CalculatorCtrl', function($scope, $rootScope, $route){
            $rootScope.route = $route;
            console.log($scope.name);

            $scope.submit = function() {
                if($scope.wsForm.$valid) {
                    $scope.datum.mealCount += 1;

                    $scope.datum.subtotal = $scope.bmp;
                    $scope.datum.tip = $scope.bmp * ($scope.tp / 100);
                
                    $scope.datum.tipTotal += $scope.datum.tip;

                    $scope.datum.total = ( $scope.bmp * ($scope.tr / 100) ) + $scope.bmp + $scope.datum.tip;
                    $scope.datum.avgTip = $scope.datum.tipTotal / $scope.datum.mealCount;
                }
            };

            $scope.cancel = function() {
                $scope.bmp = null;
                $scope.tp = null;
                $scope.tr = null;
                $scope.wsForm.$setPristine();   
                document.getElementById('bmp').focus();
            }

        })
        .controller('ParentCtrl', function($scope, $route, $rootScope){
            $scope.name = "kyle";

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

        })
        .controller('NavCtrl', function($scope, $location){
            $scope.isActive = function(path) {
                return $location.path() == path;
            };
        });

}());