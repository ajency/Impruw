var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/showcontroller'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff", function(RoomsTariff, App) {
    var RoomsTariffAppLayout;
    RoomsTariff.RoomsTariffAppController = (function(_super) {
      __extends(RoomsTariffAppController, _super);

      function RoomsTariffAppController() {
        return RoomsTariffAppController.__super__.constructor.apply(this, arguments);
      }

      RoomsTariffAppController.prototype.initialize = function(opt) {
        this.layout = this.getLayout();
        return this.show(this.layout);
      };

      RoomsTariffAppController.prototype._getLayout = function() {
        return new RoomsTariffAppLayout;
      };

      return RoomsTariffAppController;

    })(AppController);
    RoomsTariffAppLayout = (function(_super) {
      __extends(RoomsTariffAppLayout, _super);

      function RoomsTariffAppLayout() {
        return RoomsTariffAppLayout.__super__.constructor.apply(this, arguments);
      }

      RoomsTariffAppLayout.prototype.template = 'rooms tariff layout';

      RoomsTariffAppLayout.prototype.regions = {
        viewRegion: '#view-region'
      };

      return RoomsTariffAppLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:rooms:tariffs:app", function(opt) {
      var region;
      region = opt.region ? opt.region : void 0;
      return new RoomsTariff.RoomsTariffAppController(opt);
    });
  });
});
