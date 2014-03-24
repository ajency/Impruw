var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/showcontroller', 'apps/rooms/tariffs/edittariff/edittariff', 'apps/rooms/tariffs/daterange/adddaterange', 'apps/rooms/tariffs/plan/addplan'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff", function(RoomsTariff, App) {
    var RoomsTariffAppLayout;
    RoomsTariff.RoomsTariffAppController = (function(_super) {
      __extends(RoomsTariffAppController, _super);

      function RoomsTariffAppController() {
        return RoomsTariffAppController.__super__.constructor.apply(this, arguments);
      }

      RoomsTariffAppController.prototype.initialize = function(opt) {
        this.layout = this._getLayout();
        this.listenTo(this.layout, "show", this.showTariffGrid);
        this.listenTo(this.layout, "show:add:daterange", (function(_this) {
          return function() {
            return App.execute("show:add:daterange");
          };
        })(this));
        this.listenTo(this.layout, "show:add:plan", (function(_this) {
          return function() {
            return App.execute("show:add:plan");
          };
        })(this));
        return this.show(this.layout);
      };

      RoomsTariffAppController.prototype._getLayout = function() {
        return new RoomsTariffAppLayout;
      };

      RoomsTariffAppController.prototype.showTariffGrid = function() {
        return App.execute("show:tariff:grid", {
          region: this.layout.tariffGridRegion
        });
      };

      return RoomsTariffAppController;

    })(AppController);
    RoomsTariffAppLayout = (function(_super) {
      __extends(RoomsTariffAppLayout, _super);

      function RoomsTariffAppLayout() {
        return RoomsTariffAppLayout.__super__.constructor.apply(this, arguments);
      }

      RoomsTariffAppLayout.prototype.className = 'room-tariff-container';

      RoomsTariffAppLayout.prototype.template = '<div class="room-tariff-title"> <h4>Room Price</h4> <h5>Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada</h5> </div> <div class="room-tariff-actions"> <button type="button" class="btn btn-xs btn-add-range">Add Date Range</button> <button type="button" class="btn btn-xs btn-add-plan">Add Plan</button> </div> <div class="room-tariff-grid" id="room-tariff-grid"></div>';

      RoomsTariffAppLayout.prototype.events = {
        'click .btn-add-range': function() {
          return this.trigger("show:add:daterange");
        },
        'click .btn-add-plan': function() {
          return this.trigger("show:add:plan");
        }
      };

      RoomsTariffAppLayout.prototype.regions = {
        tariffGridRegion: '#room-tariff-grid'
      };

      return RoomsTariffAppLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:rooms:tariffs:app", function(opt) {
      return new RoomsTariff.RoomsTariffAppController(opt);
    });
  });
});
