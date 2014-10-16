var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/add-user-email/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails.AddUserEmail', function(AddUserEmail, App, Backbone, Marionette, $, _) {
    AddUserEmail.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.userEmailSaved = __bind(this.userEmailSaved, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.siteModel = App.request("get:site:model");
        this.addUserEmailView = this._getaddUserEmailView();
        this.listenTo(this.addUserEmailView, "add:user:email", this.addNewUserEmail);
        return this.show(this.addUserEmailView, {
          loading: true
        });
      };

      Controller.prototype._getaddUserEmailView = function() {
        return new AddUserEmail.Views.AddUserEmailView({
          model: this.siteModel
        });
      };

      Controller.prototype.addNewUserEmail = function(data) {
        var userEmail;
        userEmail = App.request("create:user:email:model", data);
        return userEmail.save(null, {
          wait: true,
          success: this.userEmailSaved
        });
      };

      Controller.prototype.userEmailSaved = function(userEmail, response) {
        this.userEmailCollection = App.request("get:user:email:collection");
        this.userEmailCollection.add(userEmail);
        return this.addUserEmailView.triggerMethod("saved:user:email", response);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:add:user:email", function(opts) {
      return new AddUserEmail.Controller(opts);
    });
  });
});
