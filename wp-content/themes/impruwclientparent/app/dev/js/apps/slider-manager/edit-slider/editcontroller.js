var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/slider-manager/edit-slider/setting/settingscontroller', 'apps/slider-manager/edit-slider/list-slides/listcontroller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider', function(EditSlider, App, Backbone, Marionette, $, _) {
    var EditSliderController, EditSliderLayout;
    EditSliderController = (function(_super) {
      __extends(EditSliderController, _super);

      function EditSliderController() {
        return EditSliderController.__super__.constructor.apply(this, arguments);
      }

      EditSliderController.prototype.initialize = function(opt) {
        var layout, slider;
        this.sliderId = opt.sliderId;
        slider = App.request("get:slider:by:id", this.sliderId);
        this.layout = layout = this._getEditLayout();
        this.listenTo(layout, "cancel:edit:slider", (function(_this) {
          return function() {
            Marionette.triggerMethod.call(_this.region, "cancel:edit:slider");
            return layout.close();
          };
        })(this));
        this.listenTo(layout, "show:edit:slide", (function(_this) {
          return function(slideId) {
            return _this._startEditSlideApp(_this.sliderId, slideId, layout.addEditSlideRegion);
          };
        })(this));
        this.listenTo(layout, "show", (function(_this) {
          return function() {
            _this._startSettingsApp(slider, layout.sliderSettingsRegion);
            _this._startSlidesListApp(_this.sliderId, layout.slidesListRegion);
            return _this._startAddSlideApp(_this.sliderId, layout.addEditSlideRegion);
          };
        })(this));
        this.show(layout);
        return App.navigate("slider-manager/edit/" + this.sliderId);
      };

      EditSliderController.prototype._getEditLayout = function() {
        return new EditSliderLayout;
      };

      EditSliderController.prototype._startSettingsApp = function(slider, region) {
        return App.execute("show:slider:edit:settings", {
          model: slider,
          region: region
        });
      };

      EditSliderController.prototype._startSlidesListApp = function(id, region) {
        return App.execute("show:slides:list", {
          sliderId: id,
          region: region
        });
      };

      EditSliderController.prototype._startAddSlideApp = function(id, region) {
        return App.execute("show:add:slide", {
          sliderId: id,
          region: region
        });
      };

      EditSliderController.prototype._startEditSlideApp = function(id, slideId, region) {
        return App.execute("show:edit:slide", {
          sliderId: id,
          slideId: slideId,
          region: region
        });
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

      EditSliderLayout.prototype.template = '<div class="row edit-slider"> <div class="col-sm-2 slider-left-nav"> <div class="cancel-slider"> <button class="btn btn-sm btn-cancel-slider cancel-edit-slider"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</button> </div> <ul class="nav nav-list"> <li class="active"> <a href="#slider-settings-region" data-toggle="tab">Slider Settings</a> </li> <li> <a href="#slides-list-region" data-toggle="tab">Slides</a> </li> <li> <a href="#add-edit-slide-region" data-toggle="tab">Add/Edit Slides</a> </li> </ul> </div> <div class="col-sm-10 slider-right-region"> <div class="tab-content"> <div id="slider-settings-region" class="tab-pane active">dsd</div> <div id="slides-list-region" class="tab-pane">dsds</div> <div id="add-edit-slide-region" class="tab-pane">dsds</div> </div> </div> </div>';

      EditSliderLayout.prototype.events = {
        'click button.cancel-edit-slider': function() {
          return this.trigger("cancel:edit:slider");
        }
      };

      EditSliderLayout.prototype.regions = {
        sliderSettingsRegion: '#slider-settings-region',
        slidesListRegion: '#slides-list-region',
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
