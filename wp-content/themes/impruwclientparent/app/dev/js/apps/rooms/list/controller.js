var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/list/views', 'entities/rooms'], function(App, AppController) {
  return App.module('RoomsApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        this.layout = this._getLayout();
        this.listenTo(this.layout, 'add:new:room:clicked', function() {
          return App.execute("show:add:room");
        });
        return this.show(this.layout);
      };

      Controller.prototype._getLayout = function() {
        return new List.View.RoomListLayout;
      };

      Controller.prototype._renderRegion = function() {
        return console.log("button is clicked");
      };

      Controller.prototype._getRoomListView = function() {
        return new List.View.RoomCollection;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:rooms:list", function(opts) {
      return new List.Controller({
        region: opts.region
      });
    });
  });
});
