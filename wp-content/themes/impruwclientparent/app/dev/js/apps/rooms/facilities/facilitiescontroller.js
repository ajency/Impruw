var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/facilities/facilitiesviews', 'apps/rooms/facilities/add/addfacilitiesapp', 'apps/rooms/facilities/list/facilitieslistapp'], function(App, AppController) {
  return App.module('FacilitiesApp', function(FacilitiesApp, App, Backbone, Marionette, $, _) {
    var FacilitiesViewLayout;
    FacilitiesApp.FacilitiesController = (function(_super) {
      __extends(FacilitiesController, _super);

      function FacilitiesController() {
        return FacilitiesController.__super__.constructor.apply(this, arguments);
      }

      FacilitiesController.prototype.initialize = function(opt) {
        this.layout = this._getFacilitiesViewLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            App.execute("show:facilities:list", {
              region: _this.layout.facilitiesRegion
            });
            return App.execute("show:add:facility", {
              region: _this.layout.addFacilityRegion
            });
          };
        })(this));
        this.listenTo(this.layout.addFacilityRegion, "new:facility:added", (function(_this) {
          return function(model) {
            return Marionette.triggerMethod.call(_this.layout.facilitiesRegion, "new:facility:added", model);
          };
        })(this));
        return this.show(this.layout);
      };

      FacilitiesController.prototype._getFacilitiesViewLayout = function() {
        return new FacilitiesViewLayout;
      };

      return FacilitiesController;

    })(AppController);
    FacilitiesViewLayout = (function(_super) {
      __extends(FacilitiesViewLayout, _super);

      function FacilitiesViewLayout() {
        return FacilitiesViewLayout.__super__.constructor.apply(this, arguments);
      }

      FacilitiesViewLayout.prototype.template = '<h4 class="aj-imp-sub-head scroll-ref"> Facilities <small>List the facilities available in this room.</small> </h4> <div class="form-group"> <div class="col-sm-12"> <div id="facilities-list-region"></div> <div id="add-facility-region"></div> </div> </div>';

      FacilitiesViewLayout.prototype.regions = {
        facilitiesRegion: '#facilities-list-region',
        addFacilityRegion: '#add-facility-region'
      };

      return FacilitiesViewLayout;

    })(Marionette.Layout);
    return App.commands.setHandler("show:facilities", function(opts) {
      return new FacilitiesApp.FacilitiesController({
        region: opts.region
      });
    });
  });
});
