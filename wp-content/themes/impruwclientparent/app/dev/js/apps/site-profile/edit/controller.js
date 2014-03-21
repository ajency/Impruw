var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/site-profile/edit/views', 'entities/site'], function(App, AppController) {
  App.module('SiteProfileApp.Edit', function(Edit, App, Backbone, Marionette, $, _) {
    return Edit.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        return this.siteProfile = App.request("get:site:model");
      };

      Controller.prototype.showSiteProfile = function() {
        var view;
        view = this.getMainView(this.siteProfile);
        App.vent.trigger("set:active:menu", 'site-profile');
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype.getMainView = function(model) {
        return new Edit.View.MainView({
          model: model
        });
      };

      return Controller;

    })(AppController);
  });
  return App.SiteProfileApp.Edit.Controller;
});
