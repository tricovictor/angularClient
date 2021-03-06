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

      .when('/ambitos/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'ambitos/index.html',
        controller: 'AmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/subambitos/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'subAmbito/index.html',
        controller: 'SubAmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/subambitos/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'subAmbito/create.html',
        controller: 'SubAmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/subambitos/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'subAmbito/edit.html',
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

      .when('/survey/close', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'survey/close.html',
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

      .when('/municipality/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'municipality/edit.html',
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

      .when('/department/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'departments/create.html',
        controller: 'DepartmentCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/department/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'departments/edit.html',
        controller: 'DepartmentCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/reports/graphics', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'reports/graphicsBar.html',
        controller: 'GraphicCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/reports/graphicsradar', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'reports/graphicsRadar.html',
        controller: 'GraphicCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/reports/graphicsgroup', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'reports/graphicsGroups.html',
        controller: 'GraphicCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/reports/graphicsambitos', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'reports/graphicsAmbitos.html',
        controller: 'GraphicCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/adminHome', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'home.html',
        controller: 'AmbitoCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })
     
      .when('/tipology/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/create.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/tipology/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/edit.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/tipology/puntaje', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/puntaje.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/tipology/solutionTi', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/solutionTi.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/tipology/viewSolution', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/viewSolution.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/municipality/viewTipology', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'municipality/viewTipology.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/tipology/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'tipologies/index.html',
        controller: 'TipologyCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/business/index', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'business/index.html',
        controller: 'BusinessCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/business/create', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'business/create.html',
        controller: 'BusinessCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/business/businessSubAmbitos', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'business/businessSubAmbitos.html',
        controller: 'BusinessCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/business/edit', {
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'business/edit.html',
        controller: 'BusinessCtrl',
        data: {
          authorized: [ROLES.ADMIN.ROL]
        }
      })

      .when('/interviewerHome', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'home.html',
        controller: 'SurveyCtrl',
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

  .value('routeini', 'http://localhost:8080/rest/')
  //.value('routeini', 'http://192.168.1.50:8080/smartcity/rest/')

  
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
