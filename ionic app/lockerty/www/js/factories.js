angular.module('starter.factories', [ ])

  .factory('LocksFactory', LocksFactory);


  LocksFactory.$inject = [ '$http' ];
  function LocksFactory($http){

    var req = {
      getLocks  : getLocks,
      getLock   : getLock,
      getFriends: getFriends,
      openLock  : openLock
    }

    return req;

    function getLocks(){
      return $http.get('js/locks.json');
    }

    function getLock(id){
      return $http.get('js/lock.json');
    }

    function getFriends(){
      return $http.get('js/friends.json');
    }

    function openLock(open){
      if(open){
        return $http.get('http://lockerty.eu-gb.mybluemix.net/api/locks/open/di')
      }else{
        return $http.get('http://lockerty.eu-gb.mybluemix.net/api/locks/close/di');
      }
    }
  }
