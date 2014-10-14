var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/show/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails', function(UserEmails, App, Backbone, Marionette, $, _) {
    UserEmails.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.userEmailView = this._getuserEmailView();
        this.listenTo(this.userEmailView, "add:new:user:email", this.addNewUserEmail);
        return this.show(this.userEmailView, {
          loading: true
        });
      };

      Controller.prototype._getuserEmailView = function() {
        return new UserEmails.Views.UserEmailView;
      };

      Controller.prototype.addNewUserEmail = function() {
        return Marionette.triggerMethod.call(this.region, "show:add:user:email");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:user:emails:app", function(opts) {
      return new UserEmails.Controller(opts);
    });
  });
});
