var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('FacilitiesApp.Add', function(Add, App, Backbone, Marionette, $, _) {
    var AddFacilityController, AddFacilityView;
    AddFacilityController = (function(_super) {
      __extends(AddFacilityController, _super);

      function AddFacilityController() {
        this.facilityAdded = __bind(this.facilityAdded, this);
        return AddFacilityController.__super__.constructor.apply(this, arguments);
      }

      AddFacilityController.prototype.initialize = function(opt) {
        this.view = this._getAddFacilityView();
        this.listenTo(this.view, "add:new:facility", this.addFacility);
        return this.show(this.view);
      };

      AddFacilityController.prototype.addFacility = function(data) {
        var facility;
        facility = App.request("create:new:facility:model", data);
        return facility.save(null, {
          wait: true,
          success: this.facilityAdded
        });
      };

      AddFacilityController.prototype.facilityAdded = function(model) {
        Marionette.triggerMethod.call(this.region, "new:facility:added", model);
        return this.view.triggerMethod("facility:added");
      };

      AddFacilityController.prototype._getAddFacilityView = function() {
        return new AddFacilityView;
      };

      return AddFacilityController;

    })(AppController);
    AddFacilityView = (function(_super) {
      __extends(AddFacilityView, _super);

      function AddFacilityView() {
        return AddFacilityView.__super__.constructor.apply(this, arguments);
      }

      AddFacilityView.prototype.className = 'facility add';

      AddFacilityView.prototype.template = '<div class="input-group"> <input type="text" name="name" class="form-control" placeholder="Add a Facility"> <span class="input-group-btn add-facility input-group-addon"><span class="icon icon-plus"></span> Add</span> </div>';

      AddFacilityView.prototype.events = {
        'click .add-facility': function() {
          return this.trigger("add:new:facility", Backbone.Syphon.serialize(this));
        }
      };

      AddFacilityView.prototype.onFacilityAdded = function() {
        return this.$el.find('input').val('');
      };

      return AddFacilityView;

    })(Marionette.ItemView);
    return App.commands.setHandler("show:add:facility", function(opts) {
      return new AddFacilityController({
        region: opts.region
      });
    });
  });
});
