var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  var NotificationController;
  NotificationController = (function(_super) {
    __extends(NotificationController, _super);

    function NotificationController() {
      return NotificationController.__super__.constructor.apply(this, arguments);
    }

    NotificationController.prototype.initialize = function(options) {
      return this.throwMessageError();
    };

    NotificationController.prototype.throwMessageError = function() {
      throw new Exception("message is missing");
    };

    return NotificationController;

  })(AppController);
  App.commands.setHandler("show:notification", function(message, options) {});
  return {
    NotificationController: NotificationController
  };
});
