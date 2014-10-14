var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/email-nav/view'], function(App, AppController) {
  return App.module('EmailsApp.EmailNav', function(EmailNav, App, Backbone, Marionette, $, _) {
    EmailNav.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.emailNavView = this._getEmailNavView();
        this.listenTo(this.emailNavView, "user:email:list", this.loadEmailList);
        return this.show(this.emailNavView, {
          loading: true
        });
      };

      Controller.prototype._getEmailNavView = function() {
        return new EmailNav.Views.EmailNavView;
      };

      Controller.prototype.loadEmailList = function() {
        return Marionette.triggerMethod.call(this.region, "load:user:email:list");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:emails:nav:app", function(opts) {
      return new EmailNav.Controller(opts);
    });
  });
});
