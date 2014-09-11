var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-rooms/rooms-seo/view'], function(App, AppController) {
  return App.module('SeoApp.SeoRooms.Rooms', function(Rooms, App, Backbone, Marionette, $, _) {
    Rooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.pageSeoUpdated = __bind(this.pageSeoUpdated, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var language, roomId;
        this.roomId = roomId = opts.roomId;
        this.language = language = opts.language;
        this.roomModel = App.request("get:translated:room:model", roomId, language);
        return App.execute("when:fetched", this.roomModel, (function(_this) {
          return function() {
            _this.translatedRoomId = _this.roomModel.get('translatedPostID');
            _this.roomSeoModel = App.request("get:seo:model", _this.translatedRoomId);
            _this.roomContentView = _this._getRoomView(_this.roomSeoModel);
            _this.listenTo(_this.roomContentView, "room:seo:save", _this.roomSeoSave);
            return _this.show(_this.roomContentView, {
              loading: true
            });
          };
        })(this));
      };

      Controller.prototype._getRoomView = function(model) {
        return new Rooms.Views.RoomContentItemView({
          model: model
        });
      };

      Controller.prototype.roomSeoSave = function(newSeoTitle, newSeoDesc, newSeoKeywords) {
        var data;
        data = [];
        data['seo_title'] = newSeoTitle;
        data['meta_description'] = newSeoDesc;
        data['meta_keywords'] = newSeoKeywords;
        this.roomSeoModel.set(data);
        return this.roomSeoModel.save(null, {
          wait: true,
          onlyChanged: true,
          success: this.pageSeoUpdated
        });
      };

      Controller.prototype.pageSeoUpdated = function(model, response) {
        return this.seoPageContentView.triggerMethod("room:seo:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo:rooms", function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new Rooms.Controller(opts);
    });
  });
});
