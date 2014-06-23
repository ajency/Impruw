var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms', function(LanguagePageRooms, App, Backbone, Marionette, $, _) {
    LanguagePageRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.languagePageRoomsView = this._getPageRoomsView();
        return this.show(this.languagePageRoomsView, {
          loading: true
        });
      };

      Controller.prototype._getPageRoomsView = function() {
        return new LanguagePageRooms.Views.LanguagePageRoomsView;
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:rooms:app", function(opts) {
      return new LanguagePageRooms.Controller(opts);
    });
  });
});
