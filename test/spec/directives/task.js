'use strict';

describe('Directive: task', function () {
  beforeEach(module('parseAngularjsTodolistApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<task></task>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the task directive');
  }));
});
