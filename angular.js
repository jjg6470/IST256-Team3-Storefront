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

angular.module('billingApp', []).controller('BillingController', function ($scope) {
        $scope.showBillingInfo = false;

        $scope.displayBillingInfo = function () {
            $scope.billingInfoJSON = {
                billingAddress: $scope.billingAddress,
                billingCity: $scope.billingCity,
                billingState: $scope.billingState,
                billingZip: $scope.billingZip,
                cardNumber: $scope.cardNumber,
                cardHolder: $scope.cardHolder,
                expirationDate: $scope.expirationDate,
                cvv: $scope.cvv
            };
            $scope.showBillingInfo = true;
        };
    });
