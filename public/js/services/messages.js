angular
  .module("messageService", [])

  .factory("Messages", [
    "$http",
    function($http) {
      return {
        get: function() {
          return $http.get("/api/messages");
        },
        create: function(data) {
          return $http.post("/api/messages", data);
        }
      };
    }
  ]);
