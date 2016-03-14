// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
      url: '/home',
      // views: {
        // main: { 
          templateUrl: 'templates/home.html', 
          controller: 'HomeCtrl'
        // }
      // }
    })
    $stateProvider.state('weather', {
      url: '/weather/:city',
      // views: {
        // main: {
          templateUrl: 'templates/weather.html',
          controller: 'WeatherCtrl'
        // }
      // }
    })
    $stateProvider.state('weatherdaily', {
      url: '/weatherdaily/:city/:date',
      // views: {
        // main: {
          templateUrl: 'templates/weatherdaily.html',
          controller: 'WeatherDailyCtrl'
        // }
      // }
    })
    $stateProvider.state('geo', {
      url: '/geo',
      // views: {
        // main: {
          templateUrl: 'templates/geo.html',
          controller: 'GeoCtrl'
        // }
      // }
    })
    $stateProvider.state('config', {
      url: '/config',
      // views: {
        // main: {
          templateUrl: 'templates/config.html',
          controller: 'ConfigCtrl'
        // }
      // }
    })
    $stateProvider.state('about', {
      url: '/about',
      // views: {
        // about: {
          templateUrl: 'templates/about.html'
      // }
      // }
    })
    $stateProvider.state('contact', {
      url: '/contact',
      // views: {
        // contact: {
          templateUrl: 'templates/contact.html'
        // }
      // }
    })
    $urlRouterProvider.otherwise('/home')

});



