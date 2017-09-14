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
        templateUrl: CONFIG.TEMPLATE_DIR + ROLES.ADMIN.PATH + 'user.html',
        controller: 'UserCtrl',
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

      .when('/interviewerHome', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'home.html',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      })

      .when('/survey', {
        templateUrl: CONFIG.TEMPLATE_DIR +ROLES.INTERVIEWER.PATH + 'survey.html',
        controller: 'SurveyCtrl',
        data: {
          authorized: [ROLES.INTERVIEWER.ROL]
        }
      });

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