'use strict';

angular.module('parseAngularjsTodolistApp')
  .directive('task', function (taskService) {
    return {
      templateUrl: 'views/directives/task.html',
      restrict: 'A',
      replace: true,
      scope: {
        task: '='
      },
      require: '^tasks',
      link: function postLink(scope, element, attrs, controller) {
        scope.removeTask = function (task){
          controller.removeTask(task);
        };

        scope.editTask = function (task) {
          scope.editMode(task, true);
        };

        scope.editMode = function(task, active) {
          task.editing = active;
          controller.editMode(active);
        };

        scope.commitTask = function (task) {
          scope.editMode(task, false);
          taskService.update(task);
        };
      }
    };
  });
