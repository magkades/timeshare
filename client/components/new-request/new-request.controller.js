'use strict';

angular.module('timeshareApp')
  .controller('NewRequestCtrl', function ($scope, $location, Auth) {
    $scope.content = "default";
    $scope.postContent = function() {
      alert($scope.content)
    }
  });
