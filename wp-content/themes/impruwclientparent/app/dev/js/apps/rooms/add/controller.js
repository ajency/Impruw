var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/add/views', 'apps/rooms/facilities/facilitiesapp', 'apps/rooms/gallery/galleryapp', 'apps/rooms/booking/bookingcontroller'], function(App, AppController) {
  return App.module('RoomsApp.Add', function(Add, App, Backbone, Marionette, $, _) {
    Add.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.showSaveMessage = __bind(this.showSaveMessage, this);
        this._saveNewRoom = __bind(this._saveNewRoom, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var layout;
        this.roomModel = App.request("create:new:room:model", {});
        this.layout = layout = this.getAddRoomLayout(this.roomModel);
        this.slidesCollection = App.request("get:slides:collection");
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            App.execute("show:facilities", {
              region: layout.facilitiesRegion,
              facilities: _this.roomModel.get('facilities')
            });
            App.execute("show:gallery:images", {
              region: layout.galleryRegion,
              collection: _this.slidesCollection
            });
            App.execute("show:rooms:tariffs:app", {
              region: layout.roomTariffRegion,
              roomId: _this.roomModel.get('ID')
            });
            return App.execute("show:booking:app", {
              region: layout.roomBookingRegion,
              roomId: _this.roomModel.get('ID')
            });
          };
        })(this));
        this.listenTo(this.layout, "show:edit:slider", (function(_this) {
          return function() {
            return App.execute("show:slides:list", {
              region: App.dialogRegion,
              collection: _this.slidesCollection
            });
          };
        })(this));
        this.slidesCollection.on("add remove", (function(_this) {
          return function(model) {
            _this.layout.triggerMethod("set:slider:id", model.get('slider_id'));
            return App.execute("show:gallery:images", {
              region: layout.galleryRegion,
              collection: _this.slidesCollection
            });
          };
        })(this));
        this.listenTo(this.layout, "save:new:room", (function(_this) {
          return function(data) {
            return _this._saveNewRoom(data);
          };
        })(this));
        this.show(layout, {
          loading: true
        });
        return App.navigate("rooms/add");
      };

      Controller.prototype._saveNewRoom = function(data) {
        data['post_status'] = 'publish';
        this.roomModel.set(data);
        return this.roomModel.save(null, {
          wait: true,
          success: this.showSaveMessage
        });
      };

      Controller.prototype.showSaveMessage = function(model) {
        App.execute("add:room:model", model);
        return this.layout.triggerMethod("show:success:message");
      };

      Controller.prototype.getAddRoomLayout = function(model) {
        return new Add.View.AddRoomLayout({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:add:room", function(opts) {
      return new Add.Controller;
    });
  });
});