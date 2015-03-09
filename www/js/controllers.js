angular.module('messageApp.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
	console.log('Login Controller Initialized');

	var ref = new Firebase($scope.firebaseUrl);
	var auth = $firebaseAuth(ref);

	$ionicModal.fromTemplateUrl('templates/signup.html', {
		id: '1',
		scope: $scope
	}).then(function (modal) {
		$scope.modal1 = modal;
	});

	$ionicModal.fromTemplateUrl('templates/signup-skills.html', {
		id: '2',
		scope: $scope
	}).then(function (modal) {
		$scope.modal2 = modal;
	});

	$scope.openModal = function(index) {
      if(index == 1) $scope.modal1.show();
      else $scope.modal2.show();
    };

    $scope.closeModal = function(index) {
      if(index == 1) $scope.modal1.hide();
      else $scope.modal2.hide();
    };	

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
					$scope.modal2.show();
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
				$state.go('tab.account');
			}).catch(function (error) {
				alert("Authentication failed:" + error.messages);
				$ionicLoading.hide();
			});
		} else
				alert("Please enter email and password");
	}
})

.controller('ChatCtrl', function ($scope, Chats, $state) {
	console.log("Chat Controller Initialized");

	$scope.IM = {
		textMessage: ""
	};

	Chats.selectRoom($state.params.roomId);

	var roomName = Chats.getSelectedRoomName();

	// Fetching Chat Records only if a Room is Selected
	if (roomName) {
		$scope.roomName = " - " + roomName;
		$scope.chats = Chats.all();
	}

	$scope.sendMessage = function (msg) {
		console.log(msg);
		Chats.send($scope.displayName, msg);
		$scope.IM.textMessage = "";
	}

	$scope.remove = function (chat) {
		Chats.remove(chat);
	}
})

.controller('RoomsCtrl', function ($scope, Rooms, Chats, $state) {
	console.log("Rooms Controller Initialized");
	$scope.rooms = Rooms.all();

	$scope.openChatRoom = function (roomId) {
		$state.go('tab.chat', {
			roomId: roomId
		});
	}
});

