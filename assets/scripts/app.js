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

            angular.copy($scope.master, $scope.datum)

            $scope.submit = function() {
                if($scope.wsForm.$valid) {
                    $scope.datum.mealCount += 1;

                    $scope.subtotal = $scope.bmp;
                    $scope.tip = $scope.bmp * ($scope.tp / 100);
                    $scope.datum.tipTotal += $scope.tip;

                    $scope.total = ( $scope.bmp * ($scope.tr / 100) ) + $scope.bmp + $scope.tip;

                    $scope.mealCount = $scope.datum.mealCount;
                    $scope.tipTotal = $scope.datum.tipTotal;
                    $scope.avgTip = $scope.datum.tipTotal / $scope.datum.mealCount;
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
                $scope.datum = $scope.master;
                $scope.cancel();
                $scope.submit();
                $scope.subtotal = 0;
                $scope.mealCount = 0;
            }

        });

}());