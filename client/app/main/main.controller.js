'use strict';

angular.module('timeshareApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.requests = [];
    $scope.user = Auth.getCurrentUser();

    $http.get('/api/requests').success(function(requests) {
      $scope.requests = requests;
      updateLists();
    });

    $scope.newRequest = function() {
      if($scope.newRequest === '') {
        return;
      }
      $http.post('/api/requests', { name: $scope.newRequest });
      $scope.newRequest = '';
    };

    $scope.deleteRequest = function(request) {
      $http.delete('/api/requests/' + request._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('requests');
    });

    $scope.changeStatus = function(request, status) {
        request.status = status;
        if (status === 'under_offer') {
          request.bidder = $scope.user;
        }
        if (status === 'rejected') {
          request.bidder = {};
        }
        //$http.put('/api/requests/'+request._id, request).success(function() {
            updateLists();
     //   });
    }

    function updateLists () {
        $scope.myRequests = $scope.requests.filter(function(request){
            return request.requester._id === $scope.user._id;
        });
        $scope.myOffers = $scope.requests.filter(function(request){
            return request.bidder._id === $scope.user._id;
        });
    }
  });
