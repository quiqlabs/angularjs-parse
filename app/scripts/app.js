'use strict';

angular.module('parseAngularjsTodolistApp', ['ngCookies'])
  .constant('parseApplicationId', 'bIpl0QzeqZA0LvacAmaxTTxRU3bOyA50chrYTdTe')
  .constant('parseRestApiKey', 'JiUZcXGQ8LHt5R7OHRteKrOTPt03D3X7OqvyYw5N')
  .factory('authenticationHttpInterceptor', function($q, appSession, parseApplicationId, parseRestApiKey){
    return {
      request: function (config) {
        config.headers['X-Parse-Application-Id'] = parseApplicationId;
        config.headers['X-Parse-REST-API-Key'] = parseRestApiKey;

        var user = appSession.getUser();
        if (user) {
          config.headers['X-Parse-Session-Token'] = user.sessionToken;

          if (config.method === 'POST') {
            if (!('ACL' in config.data)) {
              config.data.ACL = {};
            }
            // Adding the access control list for the current request
            config.data.ACL[user.objectId] = { read: true, write: true };
          }
        }
        return config || $q.when(config);
      },
    };
  })
  .factory('resultsHttpInterceptor', function($q){
    return {
      response: function (response) {
        if (angular.isObject(response.data) && ('results' in response.data)) {
          response.data = response.data.results;
        }

        return response || $q.when(response);
      },
    };
  })
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authenticationHttpInterceptor');
    $httpProvider.interceptors.push('resultsHttpInterceptor');
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
      if (current.restricted && !appSession.getUser()) {
        console.debug('User not authenticated');
        $location.path('/signin');
      }
    })
  });
