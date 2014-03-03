var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/leftnav/show/views', 'entities/leftnav'], function(App, AppController) {
  App.module('LeftNav.Show', function(Show, App, Backbone, Marionette, $, _) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        return this.links = App.request('leftnav:entities');
      };

      Controller.prototype.showLeftNav = function() {
        var view;
        view = new Show.View.LeftNav({
          collection: this.links
        });
        return this.show(view, {
          loading: true
        });
      };

      return Controller;

    })(AppController);
  });
  return App.LeftNav.Show.Controller;
});
