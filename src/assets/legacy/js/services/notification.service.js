(function () {
  'use strict';

  angular.module('todoApp')
    .service('NotificationService', NotificationService);

  NotificationService.$inject = [];

  function NotificationService() {
    this.success = function(message) {
      window.alert('Success: ' + message);
    };

    this.error = function(message) {
      window.alert('Error: ' + message);
    };

    this.info = function(message) {
      window.alert('Info: ' + message);
    };

    this.warn = function(message) {
      window.alert('Warning: ' + message);
    };
  }
})();