'use strict';

angular.module('timeshareApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.requests = [];
    $scope.user = Auth.getCurrentUser();


    $scope.myRequests = [
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
        'credit': 20,
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
            'status': 'under_offer'
        }]

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
                'credit': 20,
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
                'credit': 20,
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
                'credit': 20,
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
                'credit': 20,
                'category': 'category2',
                'status': 'under_offer'
            },
        {
            '_id': 5,
            'description': 'request5',
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
            'credit': 20,
            'category': 'category2',
            'status': 'under_offer'
        }


        ];

      updateLists();

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
            updateLists();
    }

    function updateLists () {
      //  console.log($scope.user);
       /* $scope.myRequests = $scope.requests.filter(function(request){
            return request.requester._id === $scope.user._id;
        });
*/
        console.log( $scope.myRequests);
        $scope.myOffers = $scope.requests.filter(function(request){
            return request.bidder._id === $scope.user._id;
        });
    }
  });
