var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/site-profile/edit/views', 'entities/site'], function(App, AppController) {
  App.module('SiteProfileApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
    return Edit.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.siteProfileSuccess = __bind(this.siteProfileSuccess, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        return this.siteProfile = App.request("get:site:model");
      };

      Controller.prototype.showSiteProfile = function() {
        this.view = this.getMainView(this.siteProfile);
        App.vent.trigger("set:active:menu", 'site-profile');
        this.show(this.view, {
          loading: true
        });
        this.listenTo(this.view, "save:site:profile", this.saveSiteProfile);
        return this.listenTo(this.view, "show:media:manager", (function(_this) {
          return function() {
            App.navigate("media-manager", {
              trigger: true
            });
            return _this.listenTo(App.vent, "media:manager:choosed:media", function(media) {
              _this.view.triggerMethod("set:logo", media);
              return _this.stopListening(App.vent, "media:manager:choosed:media");
            });
          };
        })(this));
      };

      Controller.prototype.saveSiteProfile = function(data) {
        var siteModel;
        siteModel = App.request("get:site:model");
        siteModel.set(data);
        return siteModel.save(null, {
          wait: true,
          success: this.siteProfileSuccess
        });
      };

      Controller.prototype.getMainView = function(model) {
        return new Edit.View.MainView({
          model: model
        });
      };

      Controller.prototype.siteProfileSuccess = function() {
        return this.view.triggerMethod("site:profile:added");
      };

      return Controller;

    })(AppController);
  });
  return App.SiteProfileApp.Edit.Controller;
});
