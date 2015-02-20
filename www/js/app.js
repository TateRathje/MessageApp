// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

  .controller('MainCtrl', ['$scope', '$firebase',
      function($scope, $firebase) {
        var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
        $scope.messages = $firebase(ref).$asArray();

        //ADD MESSAGE METHOD
        $scope.addMessage = function() {

          //LISTEN FOR RETURN KEY
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



