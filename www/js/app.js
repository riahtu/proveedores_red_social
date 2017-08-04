  angular.module('app', ['ionic','starter.controllers', 'ngCordova','auth0.lock', 'angular-jwt','ngStorage'])




 .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

     var video = document.getElementById('video-bg')
     video.addEventListener('canplay', function(){
       video.play()
     })


  });
}) 



.config(function($stateProvider,$httpProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
    

    // set all post requests content type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

   
    $stateProvider

    .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    abstract: true
    
  })
      .state('app.home', {
        url: '/home', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
          
      })

       .state('app.perfil', {
        url: '/perfil', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
      }
    }
          
      })
   

   .state('app.insertar', {
        url: '/insertar', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/insertar.html',
        controller: 'InsertarCtrl'
      }
    }
          
      })  

   .state('app.miperfil', {
        url: '/miperfil', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/miperfil.html',
        controller: 'MiperfilCtrl'
      }
    }
          
      }) 

    .state('app.editarservicio', {
        url: '/editarservicio', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/editarservicio.html',
        controller: 'EditarservicioCtrl'
      }
    }
          
      })  

    .state('app.editarubicacion', {
        url: '/editarubicacion', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/editarubicacion.html',
        controller: 'EditarubicacionCtrl'
      }
    }
          
      })     

    .state('app.motor',{
     url:'/motor',
     views : {
       'menuContent' : {
         templateUrl: 'templates/motor.html',
         controller: 'MotorCtrl'
       }
     }
   })

      .state('app.login', {
        url: '/login',
         views : {
      'menuContent' : {
        templateUrl: 'templates/login.html',
        controller:'LoginCtrl'
      }
         }
      })

      .state('app.sectores', {
    url : '/sectores',
    views : {
      'menuContent' : {
        templateUrl: 'templates/sectores.html',
        controller: 'SectoresCtrl'
      }
    }
  })
  
  .state('app.categorias',{
     url:'/sectores/:categoriaID',
     views : {
       'menuContent' : {
         templateUrl: 'templates/categorias.html',
         controller: 'CategoriasCtrl'
       }
     }
   })
   
   .state('app.proveedores',{
     url:'/categorias/:proveedoresID',
     views : {
       'menuContent' : {
         templateUrl: 'templates/proveedores.html',
         controller: 'ProveedoresCtrl'
       }
     }
   })


   
   .state('app.proveedor',{
     url:'/proveedores/:proveedorID',
     views : {
       'menuContent' : {
         templateUrl: 'templates/proveedor.html',
         controller: 'ProveedorCtrl'
       }
     }
   })

   .state('app.score', {
        url: '/score', 
         views : {
      'menuContent' : {
        templateUrl: 'templates/score.html',
        controller: 'ScoreCtrl'
      }
    }
          
      });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      redirectUri: window.location.href,
      options: {
        auth: {
          redirect: false,
          sso: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        },
          theme: {
          logo: 'http://efruver.com/imagenlotienes/logo.png',
          primaryColor: "#b91b1c"
        }
      }
    });



    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  })
  

