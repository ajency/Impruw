var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/tariffs/show/views'], function(App, AppController) {
  return App.module("RoomsApp.RoomsTariff.Show", function(Show, App) {
    var EditTariffController, GridLayout;
    EditTariffController = (function(_super) {
      __extends(EditTariffController, _super);

      function EditTariffController() {
        return EditTariffController.__super__.constructor.apply(this, arguments);
      }

      EditTariffController.prototype.initialize = function(opt) {
        var tariff, tariffView;
        this.tariffId = opt.tariffId;
        tariff = App.request("get:tariff", this.tariffId);
        this.tariffView = tariffView = this._getTariffView(tariff);
        return this.show(tariffView, {
          loading: true
        });
      };

      EditTariffController.prototype._getTariffView = function(pCollection) {
        return new Show.Views.PackagesView({
          collection: pCollection
        });
      };

      return EditTariffController;

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
    return App.execute("show:edit:tariff", function(id) {
      return new EditTariffController({
        tariffId: id,
        region: App.dialogRegion
      });
    });
  });
});
