var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-rooms/translated-language-rooms/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageRooms.TranslatedRooms', function(TranslatedRooms, App, Backbone, Marionette, $, _) {
    TranslatedRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.roomUpdated = __bind(this.roomUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var editingLang, roomId, roomModel;
        this.roomId = roomId = opts.roomId;
        this.editingLang = editingLang = opts.editingLang;
        this.roomModel = roomModel = App.request("get:translated:room:model", roomId, editingLang);
        this.translatedContentView = this._getLanguageView(roomModel);
        this.listenTo(this.translatedContentView, "translated:room:updated", this.updateTranslatedRoom);
        return this.show(this.translatedContentView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(model) {
        return new TranslatedRooms.Views.TranslatedItemView({
          model: model
        });
      };

      Controller.prototype.updateTranslatedRoom = function(newRoomTitle, newRoomDesc, roomId) {
        var data;
        data = [];
        data['translatedRoomTitle'] = newRoomTitle;
        data['translatedRoomDesc'] = newRoomDesc;
        data['translatedPostID'] = roomId;
        this.roomModel.set(data);
        return $.post("" + AJAXURL + "?action=update-translated-room", {
          room_title: newRoomTitle,
          room_desc: newRoomDesc,
          room_id: roomId
        }, this.roomUpdated, 'json');
      };

      Controller.prototype.roomUpdated = function(response) {
        return this.translatedContentView.triggerMethod("room:data:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:translated:rooms:app", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new TranslatedRooms.Controller(opts);
    });
  });
});
