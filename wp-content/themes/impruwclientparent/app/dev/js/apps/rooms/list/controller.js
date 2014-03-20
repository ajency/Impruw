var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/list/views'], function(App, AppController) {
  return App.module('RoomsApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.ListController = (function(_super) {
      __extends(ListController, _super);

      function ListController() {
        return ListController.__super__.constructor.apply(this, arguments);
      }

      ListController.prototype.initialize = function() {
        this.layout = this._getLayout();
        this.listenTo(this.layout, 'add:new:room:clicked', function() {
          return App.execute("show:add:room");
        });
        App.vent.trigger("set:active:menu", 'rooms');
        return this.show(this.layout);
      };

      ListController.prototype._getLayout = function() {
        return new List.Views.RoomListLayout;
      };

      return ListController;

    })(AppController);
    return App.commands.setHandler("show:rooms:list", function(opts) {
      return new List.ListController({
        region: opts.region
      });
    });
  });
});
