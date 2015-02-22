angular.module('messageApp.services', ['firebase'])

// let's create a re-usable factory that generates the $firebaseAuth instance

	.factory("Auth", ["$firebaseAuth", "$rootScope", 
	function ($firebaseAuth, $rootScope) {
  	var ref = new Firebase(firebaseUrl);
  	return $firebaseAuth(ref);
}]);