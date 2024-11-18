angular.module('billingApp', []).controller('ShippingController', function ($scope) {
    $scope.displayJSON = function () {
        if ($scope.address && $scope.city && $scope.state && $scope.zip && $scope.carrierName && $scope.shippingMethod) {
            $scope.shippingInfoJSON = {
                address: $scope.address,
                city: $scope.city,
                state: $scope.state,
                zip: $scope.zip,
                carrierName: $scope.carrierName,
                shippingMethod: $scope.shippingMethod
            };
            $scope.showJSON = true;
        }
    };
});
