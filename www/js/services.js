angular.module('messageApp.services', [])

// let's create a re-usable factory that generates the $firebaseAuth instance

.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
  return $firebaseAuth(ref);
}]);