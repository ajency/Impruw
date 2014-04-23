var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/password/views'], function(App, AppController) {
  return App.module('MyProfileApp.Password', function(Password, App, Backbone, Marionette, $, _) {
    Password.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.ajaxPasswordCheck = __bind(this.ajaxPasswordCheck, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var model;
        model = opts.model;
        this.model = model;
        this.view = this.getPasswordView(this.model);
        this.listenTo(this.view, "update:password:clicked", this.updatePassword);
        this.listenTo(this.view, "check:password:current", this.checkPassword);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getPasswordView = function(model) {
        return new Password.View.PasswordForm({
          model: model
        });
      };

      Controller.prototype.checkPassword = function(data) {
        var options;
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'check-password',
            json: data
          }
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            return _this.ajaxPasswordCheck(response);
          };
        })(this)).fail(function(resp) {
          return console.log('error');
        });
      };

      Controller.prototype.ajaxPasswordCheck = function(response) {
        return this.view.triggerMethod("password:check:response", response);
      };

      Controller.prototype.updatePassword = function(data) {
        var options;
        options = {
          url: AJAXURL,
          method: 'POST',
          data: {
            action: 'update-password',
            json: data
          }
        };
        return $.ajax(options).done(function(response) {
          return console.log(response);
        }).fail(function(resp) {
          return console.log('error');
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:password:form", function(opts) {
      return new Password.Controller(opts);
    });
  });
});
