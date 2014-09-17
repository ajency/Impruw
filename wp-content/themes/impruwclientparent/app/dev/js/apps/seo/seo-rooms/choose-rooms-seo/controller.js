var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-rooms/choose-rooms-seo/view'], function(App, AppController) {
  return App.module('SeoApp.SeoRooms.ChooseSeoRooms', function(ChooseSeoRooms, App, Backbone, Marionette, $, _) {
    ChooseSeoRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection;
        this.collection = collection = App.request("get:room:entities");
        this.ChooseRoomsView = this._getRoomView(collection);
        this.listenTo(this.ChooseRoomsView, "load:rooms", this.loadRooms);
        return this.show(this.ChooseRoomsView, {
          loading: true
        });
      };

      Controller.prototype._getRoomView = function(collection) {
        if (collection.length === 0) {
          return new ChooseSeoRooms.Views.EmptyView({
            collection: collection
          });
        } else {
          return new ChooseSeoRooms.Views.ChooseRoomsView({
            collection: collection
          });
        }
      };

      Controller.prototype.loadRooms = function(selectedRoomId) {
        return Marionette.triggerMethod.call(this.region, "seo:room", selectedRoomId);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("choose:seo:rooms:app", function(opts) {
      return new ChooseSeoRooms.Controller(opts);
    });
  });
});
