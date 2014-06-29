var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/room-facilities/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.RoomFacilities', function(RoomFacilities, App, Backbone, Marionette, $, _) {
    RoomFacilities.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, facilityCollection;
        editLang = opts.editLang;
        this.facilityCollection = facilityCollection = App.request("get:all:facilities", editLang);
        console.log("INSIDE room facilities facilityModel => ", facilityCollection, "editLang " + editLang);
        this.roomFacilitiesView = this._getroomFacilitiesView(facilityCollection);
        return this.show(this.roomFacilitiesView, {
          loading: true
        });
      };

      Controller.prototype._getroomFacilitiesView = function(collection) {
        return new RoomFacilities.Views.RoomFacilitiesView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("language:room:facilities:app", function(opts) {
      return new RoomFacilities.Controller(opts);
    });
  });
});
