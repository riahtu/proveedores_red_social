(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService','$scope'];

  function HomeController($state, authService, $scope,$stateParams,$ionicSideMenuDelegate,stateName) {
    var vm = this;

    vm.login = login;
    vm.logout = authService.logout;

    $scope.$on("$ionicView.beforeEnter", function() {

      authService.getProfileDeferred().then(function(profile) {
        vm.profile = profile;
      });

    });

     function login() {
      $state.go("login");
    }

    function logout() {
      authService.logout();

      // Clear VM value
      vm.profile = null;
    }

     function loginWithGoogle() {
      authService.loginWithGoogle();
     }


  function linkAccount() {
      authService.linkAccount()
        .then(function (profile) {
          vm.profile = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
          refreshIdentities();
        });
    }

     function refreshIdentities() {
      vm.profile.identities.shift();
      vm.identities = vm.profile.identities;
    }

 $scope.toggleLeft = function() {
       $state.go("menu");
    }

  }

}());
