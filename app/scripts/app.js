'use strict';

angular.module('parseAngularjsTodolistApp', [])
  .constant('parseApplicationId', 'bIpl0QzeqZA0LvacAmaxTTxRU3bOyA50chrYTdTe')
  .constant('parseRestApiKey', 'JiUZcXGQ8LHt5R7OHRteKrOTPt03D3X7OqvyYw5N')
  .config(function($httpProvider, parseApplicationId, parseRestApiKey){
    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = parseApplicationId;
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = parseRestApiKey;

    $httpProvider.defaults.transformResponse = function(data) {
      var ret;

      try {
        data = JSON.parse(data);

        if (angular.isObject(data) && ('results' in data)) {
          ret = data.results;
        }
        else {
          ret = data;
        }
      }
      catch(e){
        ret = data;
      }

      return ret;
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        restricted: true,
        controller: 'MainCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  })
  .run(function($rootScope, $location, appSession){
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
      if (current.restricted && !appSession.user) {
        console.debug('User not authenticated');
        $location.path('/signin');
      }
    })
  });
