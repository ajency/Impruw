var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/login/show/views'], function(App, AppController) {
  return App.module("LoginApp.Show", function(Show, App) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var loginView;
        loginView = this.getLoginView();
        return this.show(loginView);
      };

      Controller.prototype.getLoginView = function() {
        return new Show.View.LoginView;
      };

      return Controller;

    })(AppController);
  });
});
