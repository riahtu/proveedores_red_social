angular.module('starter.controllers',[]).filter('filtdist', function() {
    return function(input) {
        if (input) {
            return input<100;
        }
    };
})
.controller('AppCtrl', function($scope,$ionicModal, $state, authService,$scope, $timeout){
  


 

})

.controller('HomeCtrl', function($state, authService,$scope,$stateParams,$ionicModal,$http){
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


 $http.get("http://www.efruver.com/lotienes/proveedores.php").then(
    function (response) {
     
$scope.proveedor = response.data.records;});


})

.controller('LoginCtrl', function($state, authService, $ionicModal){
   var vm = this;

    function doLogin() {
      authService.login();
    }

    doLogin();

})

.controller('PerfilCtrl', function($state, authService,$scope,$stateParams,$ionicModal,$http){

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

 

	$scope.eliminar = function(){
   
     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/delete.php',
        data: $.param({
            email:vm.profile.name 
             
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }


   $http.get("http://www.efruver.com/lotienes/proveedores.php").then(
    function (response) {
     
$scope.proveedor = response.data.records;});

   $scope.doRefresh = function(){
      $state.reload(); 
      
    } 


})


.controller('InsertarCtrl', function($http, $state,authService,$scope,$cordovaGeolocation){

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


 $http.get("http://www.efruver.com/lotienes/localidades.php").then(
    function (response) {
     
$scope.ciudad = response.data.records;});

 $http.get("http://www.efruver.com/lotienes/sectores.php").then(
    function (response) {
     
$scope.sector = response.data.records;});

 $http.get("http://www.efruver.com/lotienes/categorias.php").then(
    function (response) {
     
$scope.categoria = response.data.records;});

   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

   var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          $scope.latitude  = position.coords.latitude
          $scope.longitude = position.coords.longitude
           console.log(position);
          });   
	
	$scope.guardar = function(){
     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/ajax.php',
        data: $.param({
            nombre: $scope.nombre,
            telefono: $scope.telefono,
            servicio: $scope.servicio,
            descripcion: $scope.descripcion,
            precio: $scope.precio,
            telefono: $scope.telefono,
            direccion: $scope.direccion,
            ciudad: $scope.ciudad,
            sector: $scope.proveedor.sector,
            categoria: $scope.proveedor.categoria,
            latitud: $scope.latitude,
            longitud: $scope.longitude,
            email: vm.profile.name
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }


	      
})

.controller('MiperfilCtrl', function($http,$scope, $state,authService,$stateParams){

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


   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	
	$scope.guardar = function(){
   
     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/editarperfil.php',
        data: $.param({
            nombre:$scope.nombre,
            telefono:$scope.telefono,
            email:vm.profile.name 
             
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

   $http.get("http://www.efruver.com/lotienes/proveedores.php").then(
    function (response) {
     
$scope.categoria = response.data.records;});


  
})

.controller('EditarservicioCtrl', function($http, $state,authService,$stateParams,$scope){

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
    

 $http.get("http://www.efruver.com/lotienes/sectores.php").then(
    function (response) {
     
$scope.sector = response.data.records;});

 $http.get("http://www.efruver.com/lotienes/categorias.php").then(
    function (response) {
     
$scope.categoria = response.data.records;});

   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	
	$scope.editservicio = function(){

 
   
     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/editarservicio.php',
        data: $.param({
            servicio: $scope.servicio,
            descripcion: $scope.descripcion,
            precio: $scope.precio,
            sector: $scope.proveedor.sector,
            categoria: $scope.proveedor.categoria,
            email:vm.profile.name 
             
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }



  
})

.controller('EditarubicacionCtrl', function($http, $state,authService,$stateParams,$scope,$cordovaGeolocation){

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

   
  $http.get("http://www.efruver.com/lotienes/localidades.php").then(
    function (response) {
     
  $scope.ciudad = response.data.records;});


   $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
   
 var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var Lat  = position.coords.latitude
          var Lng = position.coords.longitude

map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {lat: Lat, lng: Lng},
    zoom: 16
  });
   var marker = new google.maps.Marker({
          position: {lat: Lat, lng:Lng},
          map: map
        });

   });

     var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          $scope.latitude  = position.coords.latitude
          $scope.longitude = position.coords.longitude
           console.log(position);
          });   
	
  
	
	$scope.editubicacion = function(){

    
     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/editarubicacion.php',
        data: $.param({
            direccion: $scope.direccion,
            ciudad: $scope.ciudad,
            latitud: $scope.latitude,
            longitud: $scope.longitude,
            email: vm.profile.name
             
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }



  
})




.controller('SectoresCtrl', function($state,$scope, $http, $stateParams, $rootScope){
   
   $http.get("http://www.efruver.com/lotienes/sectores.php")
   .then(function (response) {$scope.sector = response.data.records;});  
})

.controller('MotorCtrl', function($scope, $http, authService,$stateParams,$cordovaGeolocation, $rootScope, $filter){
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



$scope.proveedorservice = $stateParams.proveedoresID;
$http.get("http://www.efruver.com/lotienes/sectores.php").then(
    function (response) {
     
$scope.sector = response.data.records;});

 $http.get("http://www.efruver.com/lotienes/categorias.php").then(
    function (response) {
     
$scope.categoria = response.data.records;});


$scope.enviar = function() {

 var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          $scope.latitude  = position.coords.latitude
          $scope.longitude = position.coords.longitude
           console.log(position);
             $scope.lat1=$scope.latitude;
             $scope.lng1=$scope.longitude;
         
      });
    
 $http.get("http://www.efruver.com/lotienes/proveedores.php").then(
    function (response) {
     
$scope.proveedor = response.data.records;

  //fORMULAS MATEMATICAS    
  $scope.Math = Math; 
 $scope.dis=$scope.rangeValue;
 
 
 
 function filter($scope,$filter){
 return function(value) {
      if(angular.isNumber(value)) {
          return $filter("number", value);  
      }

      return value;
    }
 }  



      
   })

  }
})  

 .controller('CategoriasCtrl', function($scope,  $http, $stateParams, $rootScope){  

  
  console.log($stateParams.categoriaID);
   $scope.category = $stateParams.categoriaID;

   $http.get('http://www.efruver.com/lotienes/categorias.php')
  
  .then(function (response) {$scope.sector = response.data.records;});
 
  
 })
 
 .controller('ProveedoresCtrl', function($scope,  $http, $stateParams, $rootScope){  

  
  console.log($stateParams.proveedoresID);
   $scope.proveedorservice = $stateParams.proveedoresID;

   $http.get('http://www.efruver.com/lotienes/proveedores.php')
  
  .then(function (response) {$scope.proveedor = response.data.records;});
 
  
 })
 
 .controller('ProveedorCtrl', function($scope,  $http, $stateParams,   $rootScope, $ionicModal,$log){  

  
  console.log($stateParams.proveedorID);
   $scope.proveedorperfil = $stateParams.proveedorID;

   $http.get('http://www.efruver.com/lotienes/proveedores.php')
  
  .then(function (response) {$scope.proveedor = response.data.records;});

  
  
  
 })
 
  .controller('ScoreCtrl', function($http, $state,authService,$stateParams,$scope){ 
    
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
    

console.log($stateParams.proveedorID);
   $scope.proveedorperfil = $stateParams.proveedorID;

   $http.get('http://www.efruver.com/lotienes/proveedores.php')
  
  .then(function (response) {$scope.proveedor = response.data.records;});

  $scope.score = function(){

     $scope.RadioChange = function (s) {
            $scope.GenderSelected = s;
        };

    alert($scope.GenderSelected);   

     $http({
        method: 'POST',
        url: 'http://www.efruver.com/lotienes/score.php',
        data: $.param({
           score:$scope.start,
           email:$scope.email
           
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    }).success(function (data, status, headers, config) {
           $('#resp').html(data); 
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

  
  
 });







