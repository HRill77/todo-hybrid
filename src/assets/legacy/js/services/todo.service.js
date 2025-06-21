(function () {
  'use strict';

  angular.module('todoApp')
    .service('TodoService', TodoService);

  TodoService.$inject = [];

  function TodoService() {
    var todos = [];
    var nextId = 1;

    this.getAllTodos = function() {
      return todos;
    };

    this.addTodo = function(text) {
      var todo = {
        id: nextId++,
        text: text,
        completed: false,
        createdAt: new Date()
      };
      todos.push(todo);
      return todo;
    };

    this.deleteTodo = function(id) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          return todos.splice(i, 1)[0];
        }
      }
      return null;
    };

    this.toggleTodo = function(todo) {
    //   todo.completed = !todo.completed;
      return todo;
    };

    this.getStats = function() {
      var total = todos.length;
      var completed = todos.filter(function(todo) {
        return todo.completed;
      }).length;
      var active = total - completed;

      return {
        total: total,
        completed: completed,
        active: active,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    };
  }
})();