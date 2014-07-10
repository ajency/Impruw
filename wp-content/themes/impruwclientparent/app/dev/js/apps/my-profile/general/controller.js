var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/general/views'], function(App, AppController) {
  return App.module('MyProfileApp.General', function(General, App, Backbone, Marionette, $, _) {
    General.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.userInfoUpdated = __bind(this.userInfoUpdated, this);
        this.updateUserInfo = __bind(this.updateUserInfo, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var model;
        model = opts.model;
        this.model = model;
        this.view = this.getGeneralFormView(model);
        this.listenTo(this.view, "update:user:info:click", this.updateUserInfo);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getGeneralFormView = function(model) {
        return new General.View.GeneralForm({
          model: model
        });
      };

      Controller.prototype.updateUserInfo = function(data) {
        this.model.set(data);
        return this.model.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.userInfoUpdated
        });
      };

      Controller.prototype.userInfoUpdated = function() {
        return this.view.triggerMethod("user:info:updated", response);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:general:form", function(opts) {
      return new General.Controller(opts);
    });
  });
});
