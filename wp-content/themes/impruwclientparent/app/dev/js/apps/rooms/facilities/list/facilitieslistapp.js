var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/rooms/facilities/list/views'], function(App, AppController) {
  return App.module('FacilitiesApp.List', function(List, App, Backbone, Marionette, $, _) {
    var AddFacilityView, FacilityListController;
    FacilityListController = (function(_super) {
      __extends(FacilityListController, _super);

      function FacilityListController() {
        return FacilityListController.__super__.constructor.apply(this, arguments);
      }

      FacilityListController.prototype.initialize = function(opt) {
        var collection, cview;
        this.collection = collection = App.request("get:all:facilities");
        cview = this._getFacilitiesView(collection);
        this.listenTo(cview, "itemview:delete:facility:clicked", this.deleteFacility);
        this.listenTo(this.region, "new:facility:added", function(model) {
          console.log(model);
          return this.collection.add(model);
        });
        this.listenTo(cview, "add:new:facility", this.addFacility);
        return this.show(cview, {
          loading: true
        });
      };

      FacilityListController.prototype.deleteFacility = function(iv, model) {
        return model.destroy({
          allData: false,
          wait: true
        });
      };

      FacilityListController.prototype._getFacilitiesView = function(collection) {
        return new List.Views.FacilitiesView({
          collection: collection
        });
      };

      return FacilityListController;

    })(AppController);
    AddFacilityView = (function(_super) {
      __extends(AddFacilityView, _super);

      function AddFacilityView() {
        return AddFacilityView.__super__.constructor.apply(this, arguments);
      }

      AddFacilityView.prototype.tagName = 'form';

      AddFacilityView.prototype.className = 'facility add';

      AddFacilityView.prototype.template = '<input type="text" name="name" class="form-control input-sm "> <span class="input-group-btn add-facility">Add</span>';

      AddFacilityView.prototype.events = {
        'click .add-facility': function() {
          if (this.$el.valid()) {
            return this.trigger("add:new:facility", Backbone.Syphon.serialize(this));
          }
        }
      };

      AddFacilityView.prototype.onFacilityAdded = function() {
        return this.$el.find('input').val('');
      };

      return AddFacilityView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:facilities:list", function(opts) {
      return new FacilityListController({
        region: opts.region
      });
    });
  });
});
