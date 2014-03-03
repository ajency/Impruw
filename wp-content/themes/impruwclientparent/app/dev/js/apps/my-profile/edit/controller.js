var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/edit/views', 'entities/user'], function(App, AppController) {
  App.module('MyProfileApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
    return Edit.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        this.userProfile = App.request("get:user:profile");
        this.layout = this.getLayout();
        this.show(this.layout);
        this.layout.generalFormRegion.show(this.getGeneralFormView());
        this.layout.passwordFormRegion.show(this.getPasswordFormView());
        return this.on("itemview:generalform:submit:clicked", function() {
          return console.log("general form submitted");
        });
      };

      Controller.prototype.getLayout = function() {
        return new Edit.View.Layout;
      };

      Controller.prototype.getGeneralFormView = function() {
        return new Edit.View.GeneralForm({
          model: this.userProfile
        });
      };

      Controller.prototype.getPasswordFormView = function() {
        return new Edit.View.PasswordForm;
      };

      return Controller;

    })(AppController);
  });
  return App.MyProfileApp.Edit.Controller;
});
