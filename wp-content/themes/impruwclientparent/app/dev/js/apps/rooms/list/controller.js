var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/list/views', 'entities/rooms'], function(App, AppController) {
  App.module('RoomsApp.List', function(List, App, Backbone, Marionette, $, _) {
    return List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        return this.rooms = App.request("get:room:entities");
      };

      Controller.prototype.showListView = function() {
        var view;
        view = this.getMainView(this.rooms);
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype.getMainView = function(collection) {
        return new List.View.MainView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
  });
  return App.RoomsApp.List.Controller;
});
