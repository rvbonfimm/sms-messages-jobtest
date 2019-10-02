angular
  .module("messageController", [])

  // Inject the Message service factory into our controller
  .controller("mainController", [
    "$scope",
    "$http",
    "Messages",
    function($scope, $http, Messages) {
      $scope.formData = {};
      $scope.loading = true;

      Messages.get().success(function(data) {
        $scope.messages = data;
        $scope.loading = false;
      });

      $scope.createTodo = function() {
        if ($scope.formData.text != undefined) {
          $scope.loading = true;

          // Create function returns a promise object
          Messages.create($scope.formData).success(function(data) {
            $scope.loading = false;
            $scope.formData = {};
            $scope.messages = data;
          });
        }
      };

      $scope.deleteTodo = function(id) {
        $scope.loading = true;

        Messages.delete(id).success(function(data) {
          $scope.loading = false;
          $scope.messages = data;
        });
      };
    }
  ]);
