var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/showcontroller', 'apps/rooms/tariffs/edittariff/edittariff', 'apps/rooms/tariffs/addtariff/addtariff', 'apps/rooms/tariffs/daterange/adddaterange', 'apps/rooms/tariffs/daterange/editdaterange', 'apps/rooms/tariffs/plan/editplan', 'apps/rooms/tariffs/plan/addplan'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff", function(RoomsTariff, App) {
    var RoomsTariffAppLayout;
    RoomsTariff.RoomsTariffAppController = (function(_super) {
      __extends(RoomsTariffAppController, _super);

      function RoomsTariffAppController() {
        return RoomsTariffAppController.__super__.constructor.apply(this, arguments);
      }

      RoomsTariffAppController.prototype.initialize = function(opt) {
        var roomId;
        roomId = opt.roomId;
        this.layout = this._getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("show:tariff:grid", {
              region: _this.layout.tariffGridRegion,
              roomId: roomId
            });
          };
        })(this));
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
        this.listenTo(this.layout, "show:edit:plan", (function(_this) {
          return function() {
            return App.execute("show:edit:plan");
          };
        })(this));
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

      RoomsTariffAppLayout.prototype.className = 'room-tariff-container';

      RoomsTariffAppLayout.prototype.template = '</div> <div class="room-tariff-grid" id="room-tariff-grid"></div> <button type="button" class="btn-add-range"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;{{#polyglot}}Add Date Range{{/polyglot}}</button>';

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
