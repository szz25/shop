app.controller('main', ['$scope', 'ajax', function($scope, ajax) {
    $scope.data = ajax.getJson({
        url: 'http://localhost:8080/data',
        method: 'POST'
    });
    $scope.checked = false
    $scope.check = function() {
        $scope.data.value.promise.map(function(v, i) {
            if ($scope.checked) {
                v.isCheck = true
            } else {
                v.isCheck = false
            }
        })
        $scope.plus()
        $scope.minus()
    }
}])