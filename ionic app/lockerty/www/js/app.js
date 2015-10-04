// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core',
                          'starter.controllers',
                          'starter.factories',
                          'ngOpenFB',
                          'codertyLoading'
                          ])

//.config(function($httpProvider) {
//  $httpProvider.interceptors.push(function($rootScope) {
//    return {
//      request: function(config) {
//        $rootScope.$broadcast('loading:show')
//        return config
//      },
//      response: function(response) {
//        $rootScope.$broadcast('loading:hide')
//        return response
//      }
//    }
//  })
//})


  .run(function($ionicPlatform, ngFB) {


    //$rootScope.$on('loading:show', function() {
    //  $ionicLoading.show({template: 'foo'})
    //  console.log("$ionicLoading.show({template: 'foo'})");
    //})
    //
    //$rootScope.$on('loading:hide', function() {
    //  $ionicLoading.hide()
    //  console.log("$ionicLoading.hide()");
    //})


  ngFB.init({appId: '419987954867072'});

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller:'LogginController'
    })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    resolve:{
      Lock: getLock
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController as vm'
      }
    }
  })

    .state('app.friends', {
      url: '/friends',
      templateUrl: 'templates/friends.html',
      views: {
        'menuContent': {
          templateUrl: 'templates/friends.html',
          controller: 'FriendsController as vm'
        }

      }
    })

  .state('app.locks', {
      url: '/locks',
      views: {
        'menuContent': {
          templateUrl: 'templates/locks/locks.html',
          controller: 'LocksController as vm',
        }
      },
      resolve:{
        Locks: getLocks
      }
    })

    .state('app.editlocks', {
      url: '/editlocks',
      views: {
        'menuContent': {
          templateUrl: 'templates/locks/editLocks.html',
          controller: 'EditLocksController as vm',
        }
      },
      resolve:{
        Locks: getLocks
      }
    })
    .state('app.lock', {
      url: '/lock',
      views: {
        'menuContent': {
          templateUrl: 'templates/locks/lock.html',
          controller: 'LockController as vm',
        }
      },
      resolve:{
        Lock: getLock
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
getLocks.$inject = ['LocksFactory']
function getLocks(LocksFactory){
  return LocksFactory.getLocks();

}

getLock.$inject = ['LocksFactory']
function getLock(LocksFactory){
  return LocksFactory.getLock();

}
