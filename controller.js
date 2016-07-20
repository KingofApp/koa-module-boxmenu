(function() {
  'use strict';

  angular
    .module('boxmenu', [])
    .controller('BoxMenuController', BoxMenuController);

  BoxMenuController.$inject = ['$scope', '$rootScope', '$location', 'structureService'];

  function BoxMenuController($scope, $rootScope, $location, structureService) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'boxmenu');
    $scope.showBack = false;
    if(structureService.getMenuItems().indexOf($location.$$path) === -1 && $rootScope.current != 'boxmenu'){
      $scope.showBack = true;
    }
    $scope.goBack = function() {
      window.history.back()
    };

    var moduleScope = $scope.boxmenu;
    var moduleConfig = $scope.boxmenu.modulescope;

    $scope.showBoxMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];

      function processChild(value, index) {
        structureService.getModule(value.path).then(function(module) {
          modules.push({
            text: module.name,
            icon: module.icon,
            url: '#' + value.path,
            backgroundImage: value.bgImage,
            backgroundColor: '#' + value.bgColor.replace('#','')
          });
        });
      }

      angular.forEach(moduleConfig.menuItems, processChild);

      return modules;
    }
  }

}());
