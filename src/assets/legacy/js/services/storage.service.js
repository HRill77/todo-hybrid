(function () {
  'use strict';

  angular.module('todoApp')
    .service('StorageService', StorageService);

  StorageService.$inject = [];

  function StorageService() {
    this.set = function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    };

    this.get = function(key) {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    };

    this.remove = function(key) {
      localStorage.removeItem(key);
    };

    this.clear = function() {
      localStorage.clear();
    };
  }
})();