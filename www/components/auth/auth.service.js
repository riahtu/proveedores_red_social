(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper','$q'];

  function authService($rootScope, lock, authManager, jwtHelper,$q) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.hide();

        
        

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }
          localStorage.setItem('profile', JSON.stringify(profile));
// Redirect to default page
         location.hash = '#/';
         deferredProfile.resolve(profile);

        });
      });
      }

      

    function getProfileDeferred() {
      return deferredProfile.promise;
    }
      
      function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        popup: true,
        email: username,
        password: password
      }, onAuthenticated, null);
    }


      function loginWithGoogle() {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token',
        popup: true
      }, onAuthenticated, null);
    }
      

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }

function linkAccount() {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var options = {
        rememberLastLogin: false,
        auth: {
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        }
      };

      var lockLink = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);
      var deferred = $q.defer();

      lockLink.on('authenticated', function (authResult) {

        $http({
          method: 'POST',
          url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            link_with: authResult.idToken
          }
        })
          .then(function () {
            lockLink.hide();

            lock.getProfile(token, function (error, profile) {
              if (!error) {
                deferred.resolve(profile);
              } else {
                deferred.reject(error);
              }
            });

          });

      });

      lockLink.show();

      return deferred.promise;

    }

    function unLinkAccount(identity) {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var deferred = $q.defer();

      $http({
        method: 'DELETE',
        url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities/' + identity .provider + '/' + identity .user_id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function () {

          lock.getProfile(token, function (error, profile) {
            if (!error) {
              deferred.resolve(profile);
            } else {
              deferred.reject(error);
            }
          });

        });

      return deferred.promise;

    }


    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      signup: signup,    
      loginWithGoogle: loginWithGoogle,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh,
      getProfileDeferred: getProfileDeferred,
      linkAccount: linkAccount,
      unLinkAccount: unLinkAccount
    }
  }
})();
