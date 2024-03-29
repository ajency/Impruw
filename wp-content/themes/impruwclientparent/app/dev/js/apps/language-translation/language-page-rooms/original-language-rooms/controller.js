var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/original-language-rooms/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.OriginalRooms', function(OriginalRooms, App, Backbone, Marionette, $, _) {
    OriginalRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var pageModel, roomId;
        roomId = opts.roomId;
        this.language = "en";
        this.pageModel = pageModel = App.request("get:default:room:model", roomId);
        this.originalContentView = this._getLanguageView(pageModel);
        return this.show(this.originalContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model) {
        return new OriginalRooms.Views.OriginalItemView({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:original:rooms:app", function(opts) {
      return new OriginalRooms.Controller(opts);
    });
  });
});
