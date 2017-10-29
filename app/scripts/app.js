'use strict';

var app = angular
  .module('smartcityApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])

  app.constant('CONFIG', {
    TEMPLATE_DIR: "views/",
    ROL_CURRENT_USER: localStorage.getItem('token')
  })

  app.constant('ROLES', {
    ADMIN: {
      ROL:1,
      PATH:"admin/"
    },
    INTERVIEWER: {
      ROL:2,
      PATH:"interviewer/"
    }
  })

  .config(["$routeProvider", "CONFIG", "ROLES", function ($routeProvider, CONFIG, ROLES) {
    $routeProvider
      .when('/',{
        redirectTo: '/login'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL, ROLES.INTERVIEWER.ROL]
        }
      })
      .when('/user', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'users/user.html',
        controller: 'UserCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })
      .when('/user/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'users/index.html',
        controller: 'UserCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/user/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'users/create.html',
        controller: 'UserCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/user/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'users/edit.html',
        controller: 'UserCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/ambito/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'ambitos/index.html',
        controller: 'AmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/subambito/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'subAmbito/index.html',
        controller: 'SubAmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/degree/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'degrees/index.html',
        controller: 'DegreeCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/level/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'levels/index.html',
        controller: 'LevelCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/score/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'score/index.html',
        controller: 'ScoreCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/survey/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'survey/index.html',
        controller: 'SurveyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/municipality/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'municipality/index.html',
        controller: 'MunicipalityCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/municipality/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'municipality/create.html',
        controller: 'MunicipalityCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/department/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'departments/index.html',
        controller: 'DepartmentCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/adminHome', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'home.html',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/createTechnicalDataSheets', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'technicalDatasheets/create.html',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/adminModificarFichaTI', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'technicalDatasheets/edit.html',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/adminListarFichaTI', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'technicalDatasheets/index.html',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })
      
      .when('/addTypology', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'typologies/create.html',
        controller: 'TypologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })



      .when('/interviewerHome', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'home.html',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/subSurvey', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'subSurvey.html',
        controller: 'subSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/aplicacionesMovilesComercio', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'aplicacionesMovilesComercioSurvey.html',
        controller: 'aplicacionesMovilesComercioSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/otrosServiciosComercio', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'otrosServiciosComercioSurvey.html',
        controller: 'otrosServiciosComercioSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/aplicacionesMovilesTurista', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'aplicacionesMovilesTuristaSurvey.html',
        controller: 'aplicacionesMovilesTuristaSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/otrosServiciosTurista', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'otrosServiciosTuristaSurvey.html',
        controller: 'otrosServiciosTuristaSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/serviciosElectronicosEmpleoEmprendimiento', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'serviciosElectronicosEmpleoEmprendimientoSurvey.html',
        controller: 'serviciosElectronicosEmpleoEmprendimientoSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/serviciosElectronicosInformacionConsumidor', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'serviciosElectronicosInformacionConsumidorSurvey.html',
        controller: 'serviciosElectronicosInformacionConsumidorSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/serviciosIncorporacionTIC', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'serviciosIncorporacionTICSurvey.html',
        controller: 'serviciosIncorporacionTICSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/smartEconomy/serviciosRecursosInfraestructurasInnovacion', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'serviciosRecursosInfraestructurasInnovacionSurvey.html',
        controller: 'serviciosRecursosInfraestructurasInnovacionSurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

  }])

  .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
  //$httpProvider.defaults.headers.post = {};
      delete $httpProvider.defaults.headers.common['X-Requested-With'];


  }])

  .directive('historyBackward', ['$window', function($window) {
      return {
          restrict: 'A',
          link: function(scope, elem, attrs) {
              elem.bind('click', function() {
                  $window.history.back();
              });
          }
      };
  }])

  .run(["$rootScope", "$location", "CONFIG", "ROLES", function($rootScope, $location, CONFIG, ROLES)
  {
    $rootScope.$on('$routeChangeStart', function (event, next) 
    {
          if (next.data !== undefined) 
          {
            if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
            {
              console.log("entra");
            }
            else
            {
              if(CONFIG.ROL_CURRENT_USER == 1)
              {
                $location.path(ROLES.ADMIN.PATH);
              }
              else if(CONFIG.ROL_CURRENT_USER == 2)
              {
                $location.path(ROLES.INTERVIEWER.PATH);
              }
            }
          }
      });
  }]);
