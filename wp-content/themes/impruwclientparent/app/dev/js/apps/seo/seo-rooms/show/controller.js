var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-rooms/show/view', 'apps/seo/seo-rooms/choose-rooms-seo/controller', 'apps/seo/seo-rooms/rooms-seo/controller'], function(App, AppController) {
  return App.module('SeoApp.SeoRooms', function(SeoRooms, App, Backbone, Marionette, $, _) {
    SeoRooms.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this._loadSeoRooms = __bind(this._loadSeoRooms, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var language;
        language = opts.language;
        this.language = language;
        this.roomLayout = this._getRoomLayout();
        $('.aj-imp-widget-content').show();
        this.show(this.roomLayout, {
          loading: true
        });
        this.listenTo(this.roomLayout, 'show', (function(_this) {
          return function() {
            return App.execute('choose:seo:rooms:app', {
              region: _this.roomLayout.chooseRooms
            });
          };
        })(this));
        return this.listenTo(this.roomLayout.chooseRooms, "seo:room", this._loadSeoRooms);
      };

      Controller.prototype._getRoomLayout = function() {
        return new SeoRooms.Views.SeoRooomsLayout;
      };

      Controller.prototype._loadSeoRooms = function(selectedRoomIndex) {
        App.execute('show:seo:rooms', {
          region: this.roomLayout.seoRoomContent,
          roomId: selectedRoomIndex,
          language: this.language
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:seo:rooms:app", function(opts) {
      return new SeoRooms.Controller(opts);
    });
  });
});
