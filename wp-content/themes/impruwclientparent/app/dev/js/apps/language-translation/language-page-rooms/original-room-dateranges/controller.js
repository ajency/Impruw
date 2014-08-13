var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/original-room-dateranges/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRoomDateranges', function(OriginalRoomDateranges, App, Backbone, Marionette, $, _) {
    OriginalRoomDateranges.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var daterangeCollection, editLang;
        editLang = opts.editLang;
        this.daterangeCollection = daterangeCollection = App.request("get:daterange:collection", editLang);
        this.roomDaterangesView = this._getroomDaterangesView(daterangeCollection);
        return this.show(this.roomDaterangesView, {
          loading: true
        });
      };

      Controller.prototype._getroomDaterangesView = function(collection) {
        return new OriginalRoomDateranges.Views.OriginalRoomDaterangesView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:room:dateranges:app", function(opts) {
      return new OriginalRoomDateranges.Controller(opts);
    });
  });
});
