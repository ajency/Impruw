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

      AddFacilityView.prototype.template = '<div class="input-group"> <input type="text" name="name" class="form-control" placeholder="{{#polyglot}}Add a Facility{{/polyglot}}"> <span class="input-group-btn add-facility input-group-addon"> <span class="icon icon-plus"></span>{{#polyglot}}Add{{/polyglot}} </span> </div><span id="error-msg"></span>';

      AddFacilityView.prototype.events = {
        'click .add-facility': function() {
          var facilityName;
          this.$el.find('#error-msg').empty();
          facilityName = this.$el.find('input[name="name"]').val();
          if (_.isEmpty(facilityName)) {
            return this.$el.find('#error-msg').text('Facility name required');
          } else {
            this.$el.find('.add-facility').prop('disabled', true);
            return this.trigger("add:new:facility", {
              name: this.$el.find('input[name="name"]').val()
            });
          }
        }
      };

      AddFacilityView.prototype.onFacilityAdded = function() {
        this.$el.find('input').val('');
        return this.$el.find('.add-facility').prop('disabled', false);
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
