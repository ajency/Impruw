var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/add-user-email/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails.AddUserEmail', function(AddUserEmail, App, Backbone, Marionette, $, _) {
    AddUserEmail.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.addUserEmailView = this._getaddUserEmailView();
        return this.show(this.addUserEmailView, {
          loading: true
        });
      };

      Controller.prototype._getaddUserEmailView = function() {
        return new AddUserEmail.Views.AddUserEmailView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:add:user:email", function(opts) {
      return new AddUserEmail.Controller(opts);
    });
  });
});
