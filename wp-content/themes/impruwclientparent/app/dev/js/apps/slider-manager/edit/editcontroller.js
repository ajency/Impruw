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
        console.log(this.sliderId);
        this.layout = layout = this._getEditLayout();
        return this.show(layout);
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

      EditSliderLayout.prototype.template = 'left side pane will go here. may be it wact like tab but on left <div id="slider-settings-region"></div> <div id="sliders-list-region"></div> <div id="add-edit-slide-region"></div>';

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
