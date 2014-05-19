var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/leftnav/show/views', 'entities/leftnav'], function(App, AppController) {
  return App.module('LeftNav.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        this.links = App.request("leftnav:entities");
        this.view = new Show.View.LeftNav({
          collection: this.links
        });
        this.listenTo(App.vent, "set:active:menu", this.setActiveMenu);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.setActiveMenu = function(link) {
        return this.view.triggerMethod("set:active:menu", link);
      };

      return Controller;

    })(AppController);
  });
});
