var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/facilities/facilitiesviews'], function(App, AppController) {
  return App.module('FacilitiesApp', function(FacilitiesApp, App, Backbone, Marionette, $, _) {
    FacilitiesApp.FacilitiesController = (function(_super) {
      __extends(FacilitiesController, _super);

      function FacilitiesController() {
        return FacilitiesController.__super__.constructor.apply(this, arguments);
      }

      FacilitiesController.prototype.initialize = function(opt) {
        var collection, cview;
        collection = App.request("get:all:facilities");
        cview = this._getFacilitiesView(collection);
        this.listenTo(cview, "itemview:delete:facility:clicked", this.deleteFacility);
        return this.show(cview, {
          loading: true
        });
      };

      FacilitiesController.prototype.deleteFacility = function(iv, model) {
        return model.destroy({
          allData: false,
          wait: true
        });
      };

      FacilitiesController.prototype._getFacilitiesView = function(collection) {
        return new FacilitiesApp.Views.FacilitiesView({
          collection: collection
        });
      };

      return FacilitiesController;

    })(AppController);
    return App.commands.setHandler("show:facilities", function(opts) {
      return new FacilitiesApp.FacilitiesController({
        region: opts.region
      });
    });
  });
});
