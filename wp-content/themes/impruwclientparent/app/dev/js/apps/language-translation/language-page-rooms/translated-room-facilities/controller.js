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
        this.editLang = editLang;
        this.translatedFacilityCollection = translatedFacilityCollection = App.request("get:edited:language:facilities", editLang);
        this.translatedFacilitiesView = this._getTranslatedFacilitiesView(translatedFacilityCollection);
        this.listenTo(this.translatedFacilitiesView, "update:translated:facilities", this.updateTranslatedFacilities);
        return this.show(this.translatedFacilitiesView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedFacilitiesView = function(collection) {
        return new TranslatedRoomFacilities.Views.TranslatedRoomFacilitiesView({
          collection: collection
        });
      };

      Controller.prototype.updateTranslatedFacilities = function(translatedFacilityTerms) {
        var data, responseFn;
        data = {
          translatedFacilityTerms: translatedFacilityTerms,
          editingLanguage: this.editLang
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.translatedFacilitiesView.triggerMethod("facility:terms:updated", response.msg, response.data);
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-translated-facilities", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:room:facilities:app", function(opts) {
      return new TranslatedRoomFacilities.Controller(opts);
    });
  });
});
