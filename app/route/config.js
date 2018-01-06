app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/data')
    $stateProvider.state('data', {
        url: '/data',
        templateUrl: 'view/data.html'
    })
}])