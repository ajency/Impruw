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

      EditSliderLayout.prototype.template = '<div class="row edit-slider"> <div class="col-sm-2 slider-left-nav"> <div class="cancel-slider"> <button class="btn btn-sm btn-cancel-slider"><span class="glyphicon glyphicon-remove-circle"></span>{{#polyglot}}Cancel{{/polyglot}}</button> </div> <ul class="nav nav-list"> <li class="active"> <a href="#slider-settings-region" data-toggle="tab">{{#polyglot}}Slider Settings{{/polyglot}}</a> </li> <li> <a href="#sliders-list-region" data-toggle="tab">{{#polyglot}}Slides{{/polyglot}}</a> </li> <li> <a href="#add-edit-slide-region" data-toggle="tab">{{#polyglot}}Add/Edit Slides{{/polyglot}}</a> </li> </ul> </div> <div class="col-sm-10 slider-right-region"> <div class="tab-content"> <div id="slider-settings-region" class="tab-pane active"></div> <div id="sliders-list-region" class="tab-pane"></div> <div id="add-edit-slide-region" class="tab-pane"></div> </div> </div> </div>';

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
