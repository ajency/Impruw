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
        var collection;
        this.collection = collection = App.request("get:room:entities");
        this.layout = this._getLayout(collection);
        this.listenTo(this.layout, "show", this.showRoomsList);
        this.listenTo(this.layout, 'add:new:room:clicked', function() {
          return App.execute("show:add:room");
        });
        App.vent.trigger("set:active:menu", 'rooms');
        return this.show(this.layout, {
          loading: true
        });
      };

      ListController.prototype.showRoomsList = function() {
        var imageEdit;
        this.listView = this._getRoomsListView(this.collection);
        this.layout.roomRegion.show(this.listView);
        imageEdit = App.request("get:image:crop:view", 28);
        return this.layout.editorRegion.show(imageEdit);
      };

      ListController.prototype._getLayout = function(collection) {
        return new List.Views.RoomListLayout({
          collection: collection
        });
      };

      ListController.prototype._getRoomsListView = function(collection) {
        return new List.Views.RoomsListView({
          collection: collection
        });
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
