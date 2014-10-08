var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/show/view'], function(App, AppController) {
  return App.module('EmailsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.emailView = this._getEmailView();
        App.vent.trigger("set:active:menu", 'emails');
        return this.show(this.emailView, {
          loading: true
        });
      };

      Controller.prototype._getEmailView = function() {
        return new Show.Views.EmailView;
      };

      return Controller;

    })(AppController);
  });
});
