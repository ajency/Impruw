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
        var userProfile;
        userProfile = this.userProfile = App.request("get:user:model");
        this.layout = this.getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            _this.layout.generalFormRegion.show(_this.getGeneralFormView(_this.userProfile));
            _this.layout.passwordFormRegion.show(_this.getPasswordFormView());
            _this.layout.generalFormRegion.on('show', function() {
              return _this.listenTo(_this.getGeneralFormView, 'update:user:info:click', _this.test);
            });
            return _this.listenTo(_this.layout.generalFormRegion, "itemview:update:user:info:click", function(iv, data) {
              return console.log("general form");
            });
          };
        })(this));
        App.vent.trigger("set:active:menu", 'my-profile');
        return this.show(this.layout, {
          loading: true,
          entities: [this.userProfile]
        });
      };

      Controller.prototype.getLayout = function() {
        return new Edit.View.Layout;
      };

      Controller.prototype.getGeneralFormView = function(model) {
        return new Edit.View.GeneralForm({
          model: model
        });
      };

      Controller.prototype.getPasswordFormView = function() {
        return new Edit.View.PasswordForm;
      };

      Controller.prototype.test = function() {
        return console.log('hi');
      };

      return Controller;

    })(AppController);
  });
  return App.MyProfileApp.Edit.Controller;
});
