var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-room-facilities/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRoomFacilities', function(TranslatedRoomFacilities, App, Backbone, Marionette, $, _) {
    TranslatedRoomFacilities.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, translatedFacilityCollection;
        editLang = opts.editLang;
        this.translatedFacilityCollection = translatedFacilityCollection = App.request("get:edited:language:facilities", editLang);
        this.translatedFacilitiesView = this._getTranslatedFacilitiesView(translatedFacilityCollection);
        return this.show(this.translatedFacilitiesView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedFacilitiesView = function(collection) {
        return new TranslatedRoomFacilities.Views.TranslatedRoomFacilitiesView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:room:facilities:app", function(opts) {
      return new TranslatedRoomFacilities.Controller(opts);
    });
  });
});
