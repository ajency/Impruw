var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-room-dateranges/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRoomDateranges', function(TranslatedRoomDateranges, App, Backbone, Marionette, $, _) {
    TranslatedRoomDateranges.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editLang, translatedDaterangeCollection;
        editLang = opts.editLang;
        this.editLang = editLang;
        this.translatedDaterangeCollection = translatedDaterangeCollection = App.request("get:translated:daterange:collection", editLang);
        console.log(translatedDaterangeCollection);
        this.translatedDaterangesView = this._getTranslatedDaterangesView(translatedDaterangeCollection);
        this.listenTo(this.translatedDaterangesView, "update:translated:dateranges", this.updateTranslatedDateranges);
        return this.show(this.translatedDaterangesView, {
          loading: true
        });
      };

      Controller.prototype._getTranslatedDaterangesView = function(collection) {
        return new TranslatedRoomDateranges.Views.TranslatedRoomDaterangesView({
          collection: collection
        });
      };

      Controller.prototype.updateTranslatedDateranges = function(translatedDaterange) {
        var data, responseFn;
        data = {
          translatedDaterange: translatedDaterange,
          editingLanguage: this.editLang
        };
        responseFn = (function(_this) {
          return function(response) {
            return _this.translatedDaterangesView.triggerMethod("daterange:updated");
          };
        })(this);
        return $.post("" + AJAXURL + "?action=update-translated-dateranges", data, responseFn, 'json');
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("translated:room:dateranges:app", function(opts) {
      return new TranslatedRoomDateranges.Controller(opts);
    });
  });
});
