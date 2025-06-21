(function() {
    'use strict';

    angular.module('todoApp')
    .controller('TodoController', TodoController);

    TodoController.$inject = ['TodoService', 'NotificationService', 'StorageService'];

    function TodoController(TodoService, NotificationService, StorageService) {
        var vm = this;

        // Bindable properties
        vm.todos = [];
        vm.newTodo = '';
        vm.currentFilter = 'all';
        vm.notification = { show: false, message: '', type: '' };

        // Bindable methods
        vm.addTodo = addTodo;
        vm.deleteTodo = deleteTodo;
        vm.toggleTodo = toggleTodo;
        vm.setFilter = setFilter;
        vm.getFilteredTodos = getFilteredTodos;
        vm.getTotalCount = getTotalCount;
        vm.getActiveCount = getActiveCount;
        vm.getCompletedCount = getCompletedCount;
        vm.getCompletionRate = getCompletionRate;
        vm.showNotification = showNotification;

        // Initialize
        activate();

        function activate() {
            loadTodos();
        }

        function loadTodos() {
            vm.todos = TodoService.getAllTodos();
             if (vm.todos.length === 0) {
    TodoService.addTodo('Welcome to your Todo List!');
    TodoService.addTodo('Click the checkbox to mark as done.');
    vm.todos = TodoService.getAllTodos(); // reload
  }
        }

        function addTodo() {
            if (vm.newTodo && vm.newTodo.trim()) {
                var todo = TodoService.addTodo(vm.newTodo.trim());
                showNotification('Todo added!', 'success');
                loadTodos();
                vm.newTodo = '';
            }
        }

        function deleteTodo(id) {
            if (confirm('Are you sure you want to delete this todo?')) {
                TodoService.deleteTodo(id);
                showNotification('Todo deleted.', 'success');
                loadTodos();
            }
        }

        function toggleTodo(todo) {
            TodoService.toggleTodo(todo);
            showNotification('Todo updated.', 'info');
            // loadTodos();
        }

        function setFilter(filter) {
            vm.currentFilter = filter;
        }

        function getFilteredTodos() {
  var filtered = vm.todos;
  if (vm.currentFilter === 'active') {
    filtered = _.filter(filtered, { completed: false });
  } else if (vm.currentFilter === 'completed') {
    filtered = _.filter(filtered, { completed: true });
  }
  return filtered;
}


        function getTotalCount() {
            return vm.todos.length;
        }

        function getActiveCount() {
            return _.filter(vm.todos, { completed: false }).length;
        }

        function getCompletedCount() {
            return _.filter(vm.todos, { completed: true }).length;
        }

        function getCompletionRate() {
            var total = getTotalCount();
            var completed = getCompletedCount();
            return total > 0 ? Math.round((completed / total) * 100) : 0;
        }

        function showNotification(message, type) {
            vm.notification = { show: true, message: message, type: type };
            setTimeout(function() {
                vm.notification.show = false;
                // Need to trigger digest since setTimeout is outside Angular
                if (!vm.$$phase) {
                    var $scope = angular.element(document.body).scope();
                    $scope.$apply();
                }
            }, 2000);
        }

        // Utility methods for demonstration of lodash/underscore
        vm.groupTodosByDate = function() {
            return _.groupBy(vm.todos, function(todo) {
                return new Date(todo.createdAt).toDateString();
            });
        };

        vm.getRecentTodos = function(days) {
            var targetDate = new Date();
            targetDate.setDate(targetDate.getDate() - days);
            return _.filter(vm.todos, function(todo) {
                return new Date(todo.createdAt) >= targetDate;
            });
        };
    }
})();