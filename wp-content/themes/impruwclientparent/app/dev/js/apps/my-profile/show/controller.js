var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/show/views', 'entities/user'], function(App, AppController) {
  App.module('MyProfileApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var userProfile;
        userProfile = this.userProfile = App.request("get:user:model");
        this.layout = this.getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("show:general:form", {
              region: _this.layout.generalFormRegion,
              model: _this.userProfile
            });
            App.execute("show:password:form", {
              region: _this.layout.passwordFormRegion,
              model: _this.userProfile
            });
            return App.execute("show:language:form", {
              region: _this.layout.languageFormRegion,
              model: _this.userProfile
            });
          };
        })(this));
        App.vent.trigger("set:active:menu", 'my-profile');
        return this.show(this.layout);
      };

      Controller.prototype.getLayout = function() {
        return new Show.View.Layout;
      };

      Controller.prototype.getGeneralFormView = function(model) {
        return new Show.View.GeneralForm({
          model: model
        });
      };

      Controller.prototype.getPasswordFormView = function() {
        return new Show.View.PasswordForm;
      };

      Controller.prototype.test = function() {
        return console.log('hi');
      };

      return Controller;

    })(AppController);
  });
  return App.MyProfileApp.Show.Controller;
});
