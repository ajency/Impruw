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

      EditSliderLayout.prototype.template = '<div class="row edit-slider"> <div class="col-sm-2 slider-left-nav"> <div class="cancel-slider"> <button class="btn btn-sm btn-cancel-slider"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</button> </div> <ul class="nav nav-list"> <li class="active"> <a href="#slider-settings-region" data-toggle="tab">Slider Settings</a> </li> <li> <a href="#sliders-list-region" data-toggle="tab">Slides</a> </li> <li> <a href="#add-edit-slide-region" data-toggle="tab">Add/Edit Slides</a> </li> </ul> </div> <div class="col-sm-10 slider-right-region"> <div class="tab-content"> <div id="slider-settings-region" class="tab-pane active"></div> <div id="sliders-list-region" class="tab-pane"> <div class="slides-container"> <h6>Slides</h6> <div class="slide"> <div class="row"> <div class="col-sm-1 move"> <div class="move-icon"> <span class="glyphicon glyphicon-resize-vertical"></span> </div> </div> <div class="col-sm-3 thumb"> <img data-src="holder.js/100%x75/social"> </div> <div class="col-sm-8 details"> <div class="slide-title"> Slide 1 </div> <div class="slide-image-name"> slide.jpg </div> <div class="slide-actions"> <button class="btn btn-info btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit Slide</button> <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span> Delete</button> </div> </div> </div> </div> </div> </div> <div id="add-edit-slide-region" class="tab-pane"></div> </div> </div> </div>';

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
