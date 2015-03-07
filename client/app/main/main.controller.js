'use strict';

angular.module('timeshareApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.requests = [];
    $scope.user = Auth.getCurrentUser();
    $scope.requests = [
      {
        '_id': 1,
        'description': 'request1',
        'requester': 
          {
            '_id': '1',
            'name': 'user1'
          },
        'bidder': 
          {
            '_id': '2',
            'name': 'user2'
          },
        'credit': 10,
        'category': 'category1',
        'status': 'open'
      },
      {
          '_id': 2,
        'description': 'request2',
        'requester': 
          {
            '_id': '3',
            'name': 'user3'
          },
        'bidder': 
          {
            '_id': '2',
            'name': 'user2'
          },
        'credit': 20,
        'category': 'category1',
        'status': 'open'
      },
      {
          '_id': 3,
        'description': 'request3',
        'requester': 
          {
            '_id': '1',
            'name': 'user1'
          },
        'bidder': 
          {
            '_id': '54fb0748fe56bf75396bd07e',
            'name': 'mcarmen'
          },
        'credit': 10,
        'category': 'category2',
        'status': 'open'
      },
      {
          '_id': 4,
        'description': 'request4',
        'requester': 
          {
            '_id': '54fb0748fe56bf75396bd07e',
            'name': 'mcarmen'
          },
        'bidder': 
          {
            '_id': '5',
            'name': 'user5'
          },
        'credit': 10,
        'category': 'category2',
        'status': 'open'
      },
        {
            '_id': 4,
            'description': 'request4',
            'requester':
            {
                '_id': '54fb0748fe56bf75396bd07e',
                'name': 'mcarmen'
            },
            'bidder':
            {
                '_id': '5',
                'name': 'user5'
            },
            'credit': 10,
            'category': 'category2',
            'status': 'under_offer'
        }

      ];

     updateLists();

    $http.get('/api/requests').success(function(requests) {
      $scope.requests = [
      {
        'description': 'request1',
        'requester': 
          {
            '_id': 1,
            'name': 'user1'
          },
        'bidder': 
          {
            '_id': 2,
            'name': 'user2'
          },
        'credit': 10,
        'category': 'category1',
        'status': 'open'
      },
      {
        'description': 'request2',
        'requester': 
          {
            '_id': 3,
            'name': 'user3'
          },
        'bidder': 
          {
            '_id': 2,
            'name': 'user2'
          },
        'credit': 20,
        'category': 'category1',
        'status': 'open'
      },
      {
        'description': 'request3',
        'requester': 
          {
            '_id': 1,
            'name': 'user1'
          },
        'bidder': 
          {
            '_id': 3,
            'name': 'user3'
          },
        'credit': 10,
        'category': 'category2',
        'status': 'open'
      }
      ];
      socket.syncUpdates('requests', $scope.awesomerequests);
    });

    $scope.newRequest = function() {
      if($scope.newRequest === '') {
        return;
      }
      $http.post('/api/requests', { name: $scope.newRequest });
      $scope.newRequest = '';
    };

    $scope.deleteThing = function(request) {
      $http.delete('/api/requests/' + request._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('requests');
    });

    $scope.changeStatus = function(request, status) {
        request.status = status;
        request.bidder = $scope.user;

       // $http.put('/api/requests/'+request._id, request).success(function() {
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
