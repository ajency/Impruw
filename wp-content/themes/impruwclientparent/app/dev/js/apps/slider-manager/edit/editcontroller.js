var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider', function(EditSlider, App, Backbone, Marionette, $, _) {
    var EditSliderController, EditSliderLayout;
    EditSliderController = (function(_super) {
      __extends(EditSliderController, _super);

      function EditSliderController() {
        return EditSliderController.__super__.constructor.apply(this, arguments);
      }

      EditSliderController.prototype.initialize = function(opt) {
        var layout;
        this.sliderId = opt.sliderId;
        this.layout = layout = this._getEditLayout();
        this.listenTo(layout, "cancel:edit:slider", (function(_this) {
          return function() {
            Marionette.triggerMethod.call(_this.region, "cancel:edit:slider");
            return layout.close();
          };
        })(this));
        this.show(layout);
        return App.navigate("slider-manager/edit/" + this.sliderId);
      };

      EditSliderController.prototype._getEditLayout = function() {
        return new EditSliderLayout;
      };

      EditSliderController.prototype.onClose = function() {
        return App.navigate('slider-manager');
      };

      EditSliderController.prototype.onShow = function() {
        return App.navigate("slider-manager/edit/" + sliderId);
      };

      return EditSliderController;

    })(AppController);
    EditSliderLayout = (function(_super) {
      __extends(EditSliderLayout, _super);

      function EditSliderLayout() {
        return EditSliderLayout.__super__.constructor.apply(this, arguments);
      }

      EditSliderLayout.prototype.template = '<div class="row"> <div class="col-sm-3"> Left Nav <button type="btutton" class="btn cancel-edit-slider">Cancel</button> </div> <div class="col-sm-9"> <div id="slider-settings-region"></div> <div id="sliders-list-region"></div> <div id="add-edit-slide-region"></div> </div> </div>';

      EditSliderLayout.prototype.events = {
        'click button.cancel-edit-slider': function() {
          return this.trigger("cancel:edit:slider");
        }
      };

      EditSliderLayout.prototype.regions = {
        sliderSettingsRegion: '#slider-settings-region',
        slidesListRegion: '#sliders-list-region',
        addEditSlideRegion: '#add-edit-slide-region'
      };

      return EditSliderLayout;

    })(Marionette.Layout);
    return App.commands.setHandler('show:edit:slider', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new EditSliderController(opts);
    });
  });
});
