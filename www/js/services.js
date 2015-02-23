angular.module('messageApp.services', ['firebase'])

// let's create a re-usable factory that generates the $firebaseAuth instance

	.factory("Auth", ["$firebaseAuth", "$rootScope", 
		function ($firebaseAuth, $rootScope) {
	  	var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
	  	return $firebaseAuth(ref);
}])

	.factory('Rooms', function ($firebase) {
		var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
		var rooms = $firebase(ref.child('rooms')).$asArray();

	return {
		all: function () {
			return rooms;
		},
		get: function (roomId) {
			// Simple index lookup
			return rooms.$getRecord(roomId);
		}
	}
	});