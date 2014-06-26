var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/choose-rooms/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.ChooseRooms', function(ChooseRooms, App, Backbone, Marionette, $, _) {
    ChooseRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection;
        this.collection = collection = App.request("get:room:entities");
        console.log("Collection of rooms", this.collection);
        this.ChooseRoomsView = this._getLanguageView(collection);
        this.listenTo(this.ChooseRoomsView, "load:original:rooms", this.loadOriginalRooms);
        this.listenTo(this.ChooseRoomsView, "load:translated:rooms", this.loadTranslatedRooms);
        return this.show(this.ChooseRoomsView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection) {
        return new ChooseRooms.Views.ChooseRoomsView({
          collection: collection
        });
      };

      Controller.prototype.loadOriginalRooms = function(selectedRoomId) {
        return Marionette.triggerMethod.call(this.region, "original:room", selectedRoomId);
      };

      Controller.prototype.loadTranslatedRooms = function(selectedRoomId) {
        return Marionette.triggerMethod.call(this.region, "translated:room", selectedRoomId);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("choose:rooms:app", function(opts) {
      return new ChooseRooms.Controller(opts);
    });
  });
});
