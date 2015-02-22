angular.module('messageApp.controllers', [])

.controller('MainCtrl', function ($scope, $firebase, $state) {

    var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
 
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
 })

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
	console.log('Login Controller Initialized');

	var ref = new Firebase("https://vivid-fire-704.firebaseio.com/");
	//var ref = new Firebase($scope.firebaseUrl);
	var auth = $firebaseAuth(ref);

	$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.createUser = function (user) {
		console.log("Create User Function Called");
		if (user && user.email && user.password && user.displayname) {
			$ionicLoading.show({
				template: 'Signing Up...'
			});

			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function (userData) {
					alert("User created successfully!");
					ref.child("users").child(userData.uid).set({
						email: user.email,
						displayName: user.displayname
					});
					$ionicLoading.hide();
					$scope.modal.hide();
			}).catch(function (error) {
				alert("Error: " + error);
				$ionicLoading.hide();
			});
		} else
				alert("Please fill out all details");
	}

	$scope.signIn = function (user) {
		
		if (user && user.email && user.pwdForLogin) {
			$ionicLoading.show({
				template: 'Signing In...'
			});
			auth.$authWithPassword({
				email: user.email,
				password: user.pwdForLogin
			}).then(function (authData) {
				console.log("Logged in as:" + authData.uid);
				ref.child("users").child(authData.uid).once('value', function (snapshot) {
					var val = snapshot.val();
					// To Update AngularJS #scope either use $apply or $timeout
					$scope.$apply(function () {
						$rootScope.displayName = val;
					});
				});
				$ionicLoading.hide();
				$state.go('tab.messages');
			}).catch(function (error) {
				alert("Authentication failed:" + error.messages);
				$ionicLoading.hide();
			});
		} else
				alert("Please enter email and password");
	}
});

