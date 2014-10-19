var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/show/view', 'apps/emails/user-emails/add-user-email/controller', 'apps/emails/user-emails/edit-user-email/controller', 'apps/emails/user-emails/enable-user-email/controller'], function(App, AppController) {
  return App.module('EmailsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._showAddUserEmail = __bind(this._showAddUserEmail, this);
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
        this.listenTo(this.emailLayout.emailsNav, "load:user:email:list", this._loadUserEmails);
        return this.listenTo(this.emailLayout.emailsDisplay, "show:add:user:email", this._showAddUserEmail);
      };

      Controller.prototype._getEmailLayout = function() {
        return new Show.Views.EmailView;
      };

      Controller.prototype._loadUserEmails = function() {
        return App.execute("show:user:emails:app", {
          region: this.emailLayout.emailsDisplay
        });
      };

      Controller.prototype._showAddUserEmail = function() {
        return App.execute("show:add:user:email", {
          region: App.dialogRegion
        });
      };

      return Controller;

    })(AppController);
  });
});
