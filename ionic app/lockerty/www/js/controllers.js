angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {

})

  .controller('LogginController', function($scope, ngFB, $state, $timeout){

    $timeout(function(){
      $state.go('app.home');
    },2000);

    $scope.fbLogin = function () {

      $state.go('app.home');

      //ngFB.login({scope: 'email,publish_actions,user_friends'}).then(
      //  function (response) {
      //    if (response.status === 'connected') {
      //      console.log('Facebook login succeeded:', response);
      //      $state.go('app.home');
      //    } else {
      //      $ionicPopup.alert({
      //        title: 'UPS!',
      //        template: '<span>Error al autenticar con Facebook!</span>'
      //      });
      //    }
      //  });

    };
  })

.controller('HomeController', HomeController)
.controller('FriendsController', FriendsController)

.controller('MenuController', function(ngFB, $state) {

  var vm = this;

    vm.logout = function(){
      //TODO::Call FB api to close session
      //ngFB.logout().then(
      //  function (res) {
      //  },
      //  function (error) {
      //
      //  });
      $state.go('login');
    }

})


.controller('EditLocksController',EditLocksController)
.controller('LockController',LockController)
.controller('LocksController',LocksController);

LocksController.$inject = [ 'Locks', '$ionicListDelegate', '$state', '$timeout', 'LocksFactory' ]
function LocksController( Locks, $ionicListDelegate, $state, $timeout, LocksFactory ) {
  console.log('Locks' , Locks);

  var vm = this;

  if ( Locks ){
    vm.locks = Locks.data;
  }

  vm.favorites = [
    {
      "_id": "560facafafe0075016e298d8",
      "_type": "lock",
      "name": "Casa",
      "locked": true,
      "allowed": [
        "560facaf35991c73d63370b4",
        "560facafcb82bcdc5af847e9",
        "560facaf2b2bcd0027c6067a",
        "560facaf175eec3cfb5f47d0",
        "560facaf627a75ab0a675b6e"
      ]
    },
    {
      "_id": "560facaf1903ed3d4c22b13d",
      "_type": "lock",
      "name": "Trabajo",
      "locked": true,
      "allowed": [
        "560facaf8c8be50498605a98",
        "560facaf4d40dc11b4b14e6f",
        "560facafba56e05240936590",
        "560facafae2b35cad93f59c5",
        "560facaf1c9ad80102bf2b19"
      ]
    }];

  //vm.changeState = function(lock){
  //  $ionicListDelegate.closeOptionButtons();
  //  lock.changing = true;
  //  $timeout(function(){
  //
  //    LocksFactory.openLock();
  //
  //    if(lock.locked){
  //      lock.locked = false;
  //    }else{
  //      lock.locked = true;
  //    }
  //    lock.changing = false;
  //  },2000);
  //}

  vm.changeState = function(lock){
    $ionicListDelegate.closeOptionButtons();
    lock.changing = true;
    $timeout(function(){

      if(lock.locked){
        LocksFactory.openLock(true);
        lock.locked = false;
      }else{
        LocksFactory.openLock(false);
        lock.locked = true;
      }
      lock.changing = false;
    },2000);
  }

  vm.edit = function(lock){
    console.log('edit lock:', lock);
    $state.go('app.lock');
  }

}


EditLocksController.$inject = [ 'Locks' ]
function EditLocksController( Locks ) {
  console.log('Locks' , Locks);

  var vm = this;

  if ( Locks ){
    vm.locks = Locks.data;
  }

  vm.changeState = function(lock){
    if(lock.locked){
      lock.locked = false;
    }else{
      lock.locked = true;
    }
  }

}

LockController.$inject = [ 'Lock', '$timeout', 'LocksFactory' ]
function LockController( Lock, $timeout, LocksFactory ) {

  var vm = this;

  console.log(Lock)
  vm.lock = Lock.data;

  //vm.changeState = function(lock){
  //
  //  lock.changing = true;
  //  $timeout(function(){
  //
  //    LocksFactory.openLock();
  //
  //    if(lock.locked){
  //      lock.locked = false;
  //    }else{
  //      lock.locked = true;
  //    }
  //    lock.changing = false;
  //  },2000);
  //}

  vm.changeState = function(lock){

    lock.changing = true;
    $timeout(function(){

      if(lock.locked){
        LocksFactory.openLock(true);
        lock.locked = false;
      }else{
        LocksFactory.openLock(false);
        lock.locked = true;
      }
      lock.changing = false;
    },2000);
  }


}



HomeController.$inject = [ 'LocksFactory', 'Lock', '$timeout' ]
function HomeController(LocksFactory, Lock, $timeout) {

  var vm = this;
  console.log('HomeController');



  //ngFB.api({
  //  path: '/me/taggable_friends?fields=name&limit=1000'
  //  ,params: {fields: 'id,name'}
  //}).then(
  //  function (friends) {
  //    vm.friends = friends.data;
  //  },
  //  function (error) {
  //    alert('Facebook error: ' + error.error_description);
  //  });


  //ngFB.api({path: '/me/friends', success: function(res){
  //  console.log('ok',res);
  //}, error: function(res){
  //  console.log('error',res);
  //}});

  var vm = this;
  vm.lock = Lock.data;
  vm.changeState = function(lock){

    lock.changing = true;
    $timeout(function(){

      if(lock.locked){
        LocksFactory.openLock(true);
        lock.locked = false;
      }else{
        LocksFactory.openLock(false);
        lock.locked = true;
      }
      lock.changing = false;
    },2000);
  }

}


FriendsController.$inject = [ 'LocksFactory' ]
function FriendsController(LocksFactory) {

  var vm = this;
  console.log('HomeController');

  LocksFactory.getFriends().then(
    function(res){
      vm.friends = res.data.data;
      console.log('Firends:', vm.friends);
    },
    function(){
      vm.friends = [];
      console.error('Error al cargar los usuarios');
    }
  )


  //ngFB.api({
  //  path: '/me/taggable_friends?fields=name&limit=1000'
  //  ,params: {fields: 'id,name'}
  //}).then(
  //  function (friends) {
  //    vm.friends = friends.data;
  //  },
  //  function (error) {
  //    alert('Facebook error: ' + error.error_description);
  //  });


  //ngFB.api({path: '/me/friends', success: function(res){
  //  console.log('ok',res);
  //}, error: function(res){
  //  console.log('error',res);
  //}});
}
