app.directive('product', function() {
    return {
        templateUrl: 'view/directive.html',
        replace: true,
        controller: ['$scope', function($scope) {
            $scope.amount = 0
            $scope.total = 0
            $scope.checked = false
            $scope.plus = function($index) {
                $scope.amount = 0
                $scope.total = 0
                $scope.data.value.promise.map(function(v, i) {
                    if ($index == i) {
                        v.count++;
                    }
                    if (v.isCheck) {
                        $scope.amount += v.price * v.count
                        $scope.total += v.count
                    }
                })
            }
            $scope.minus = function($index) {
                $scope.amount = 0
                $scope.total = 0
                $scope.data.value.promise.map(function(v, i) {
                    if ($index == i) {
                        if (v.count <= 0) {
                            return
                        }
                        v.count--;
                    }
                    if (v.isCheck) {
                        $scope.amount += v.price * v.count
                        $scope.total += v.count
                    }
                })
            }
            $scope.clost = function($index) {
                const dl = document.querySelectorAll('dl');
                [...dl].forEach(function(v, i) {
                    if ($index == v.id) {
                        v.parentNode.removeChild(v);
                    }
                })
            }
            $scope.checkC = function(bool) {
                let str = 0;
                this.$parent.data.value.promise.forEach(function(v) {
                    if (v.isCheck) {
                        str++;
                    } else {
                        $scope.checked = false
                    }
                })
                if (str == this.$parent.data.value.promise.length) {
                    $scope.checked = true
                }
                $scope.plus()
                $scope.minus()
            }
        }]
    }
})