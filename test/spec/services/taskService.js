'use strict';

describe('Service: task', function () {

  // load the service's module
  beforeEach(module('parseAngularjsTodolistApp'));

  // instantiate service
  var task;
  beforeEach(inject(function (_task_) {
    task = _task_;
  }));

  it('should do something', function () {
    expect(!!task).toBe(true);
  });

});
