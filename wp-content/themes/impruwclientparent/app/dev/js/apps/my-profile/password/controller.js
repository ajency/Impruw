var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/password/views'], function(App, AppController) {
  return App.module('MyProfileApp.Password', function(Password, App, Backbone, Marionette, $, _) {
    Password.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.passwordUpdated = __bind(this.passwordUpdated, this);
        this.updatePassword = __bind(this.updatePassword, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var model;
        model = opts.model;
        this.model = model;
        this.view = this.getPasswordView();
        this.listenTo(this.view, "update:password:clicked", this.updatePassword);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getPasswordView = function() {
        return new Password.View.PasswordForm;
      };

      Controller.prototype.updatePassword = function(data) {
        this.model.set(data);
        return this.model.save(null, {
          onlyChanged: true,
          wait: true,
          success: this.passwordUpdated
        });
      };

      Controller.prototype.passwordUpdated = function(model, response) {
        if (response.code === "ERROR") {
          return this.view.triggerMethod("password:error:response", response.msg);
        } else if (response.code === "OK") {
          return this.view.triggerMethod("password:success:response", response.redirect_url);
        }
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:password:form", function(opts) {
      return new Password.Controller(opts);
    });
  });
});
