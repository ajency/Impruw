var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/emails/user-emails/edit-user-email/view'], function(App, AppController) {
  return App.module('EmailsApp.UserEmails.EditUserEmail', function(EditUserEmail, App, Backbone, Marionette, $, _) {
    EditUserEmail.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.userEmailModel = opts.model;
        this.editUserEmailView = this._geteditUserEmailView();
        return this.show(this.editUserEmailView, {
          loading: true
        });
      };

      Controller.prototype._geteditUserEmailView = function() {
        return new EditUserEmail.Views.EditUserEmailView({
          model: this.userEmailModel
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:edit:user:email", function(opts) {
      opts = {
        region: App.dialogRegion,
        model: opts.model
      };
      return new EditUserEmail.Controller(opts);
    });
  });
});
