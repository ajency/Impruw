var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-language-rooms/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRooms', function(TranslatedRooms, App, Backbone, Marionette, $, _) {
    TranslatedRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var pageModel, roomId;
        roomId = opts.roomId;
        this.pageModel = pageModel = App.request("get:default:room:model", roomId);
        this.translatedContentView = this._getLanguageView(pageModel);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model) {
        return new TranslatedRooms.Views.TranslatedItemView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:translated:rooms:app", function(opts) {
      return new TranslatedRooms.Controller(opts);
    });
  });
});
