var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/show/view'], function(App, AppController) {
  return App.module('EmailsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadUserEmails = __bind(this._loadUserEmails, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.emailLayout = this._getEmailLayout();
        App.vent.trigger("set:active:menu", 'emails');
        this.show(this.emailLayout, {
          loading: true
        });
        this.listenTo(this.emailLayout, 'show', (function(_this) {
          return function() {
            return App.execute('show:emails:nav:app', {
              region: _this.emailLayout.emailsNav
            });
          };
        })(this));
        return this.listenTo(this.emailLayout.emailsNav, "load:user:email:list", this._loadUserEmails);
      };

      Controller.prototype._getEmailLayout = function() {
        return new Show.Views.EmailView;
      };

      Controller.prototype._loadUserEmails = function() {
        return App.execute("show:user:emails:app", {
          region: this.emailLayout.emailsDisplay
        });
      };

      return Controller;

    })(AppController);
  });
});
