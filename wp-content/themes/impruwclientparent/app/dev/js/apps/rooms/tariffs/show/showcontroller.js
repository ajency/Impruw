var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/views'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff.Show", function(Show, App) {
    var GridLayout, ShowController;
    ShowController = (function(_super) {
      __extends(ShowController, _super);

      function ShowController() {
        return ShowController.__super__.constructor.apply(this, arguments);
      }

      ShowController.prototype.initialize = function(opt) {
        var pcollection, tcollection;
        this.roomId = opt.roomId;
        if (!this.roomId) {
          throw new Error("Invalid room id: " + this.roomId);
        }
        pcollection = App.request("get:plans:collection");
        tcollection = App.request("get:tariffs:collection", this.roomId);
        this.layout = this._getGridLayout();
        this.packagesView = this._getPackagesView(pcollection);
        this.dateRangeView = this._getTariffsView(tcollection);
        this.listenTo(this.dateRangeView, 'itemview:show:edit:tariff', (function(_this) {
          return function(iv, id) {
            return App.execute("show:edit:tariff", id);
          };
        })(this));
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            _this.layout.packagesRegion.show(_this.packagesView);
            return _this.layout.tariffRegion.show(_this.dateRangeView);
          };
        })(this));
        return this.show(this.layout, {
          loading: true
        });
      };

      ShowController.prototype._getPackagesView = function(pCollection) {
        return new Show.Views.PackagesView({
          collection: pCollection
        });
      };

      ShowController.prototype._getTariffsView = function(tcollection) {
        return new Show.Views.TariffsView({
          collection: tcollection
        });
      };

      ShowController.prototype._getGridLayout = function() {
        return new GridLayout;
      };

      return ShowController;

    })(AppController);
    GridLayout = (function(_super) {
      __extends(GridLayout, _super);

      function GridLayout() {
        return GridLayout.__super__.constructor.apply(this, arguments);
      }

      GridLayout.prototype.template = '	<div id="packages-region"></div> <div id="tariff-region"></div>';

      GridLayout.prototype.regions = {
        packagesRegion: '#packages-region',
        tariffRegion: '#tariff-region'
      };

      return GridLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:tariff:grid", function(opt) {
      return new ShowController(opt);
    });
  });
});
