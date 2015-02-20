angular.module('messageApp.controllers', [])

.controller('MainCtrl', ['$scope', '$firebase', 'Auth',
  function($scope, $firebase, Auth) {

    var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");

    // any time auth status updates, add the user data to scope
  	Auth.$onAuth(function(authData) {
     $scope.authData = authData;
    
    $scope.messages = $firebase(ref).$asArray();

    //ADD MESSAGE METHOD
    $scope.addMessage = function() {

      if ($scope.msg) {
        //ALLOW CUSTOM OR ANONYMOUS USER NAMES
        var name = $scope.name || 'anonymous';
        $scope.messages.$add({
          from: name,
          body: $scope.msg,
          timestamp: Firebase.ServerValue.TIMESTAMP
        });
        //RESET MESSAGE
        $scope.msg = "";
      }
    };
 }]);

