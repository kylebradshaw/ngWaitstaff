(function(){
    'use strict';

    angular
        .module('waitstaff', [])
        .controller('wsCtrl', function($scope){
            $scope.master = {
                subtotal: 0,
                tip: 0,
                total: 0,
                tipTotal: 0,
                mealCount: 0,
                avgTip: 0
            };

            $scope.datum = {};
            angular.copy($scope.master, $scope.datum);

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

            //copy is not working ?
            $scope.reset = function() {
                angular.copy($scope.master, $scope.datum);
                $scope.cancel();
            }

        });

}());