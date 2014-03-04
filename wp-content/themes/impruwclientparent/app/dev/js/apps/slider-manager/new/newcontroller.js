var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.NewSlider', function(NewSlider, App, Backbone, Marionette, $, _) {
    var NewSliderController, NewSliderLayout;
    NewSliderController = (function(_super) {
      __extends(NewSliderController, _super);

      function NewSliderController() {
        return NewSliderController.__super__.constructor.apply(this, arguments);
      }

      NewSliderController.prototype.initialize = function(opt) {
        var layout;
        this.selectedMediaCollection = App.request("get:empty:media:collection");
        layout = new NewSliderLayout;
        this.listenTo(layout, "cancel:create:slider", (function(_this) {
          return function() {
            Marionette.triggerMethod.call(_this.region, "cancel:create:slider");
            return layout.close();
          };
        })(this));
        this.listenTo(layout.gridRegion, "media:element:selected", function(mediaModel) {
          return this.selectedMediaCollection.add(mediaModel);
        });
        this.listenTo(layout.gridRegion, "media:element:unselected", function(mediaModel) {
          return this.selectedMediaCollection.remove(mediaModel);
        });
        this.listenTo(layout, "create:new:slider", (function(_this) {
          return function(sliderData) {
            var sliderModel;
            data.slider_images = _this.selectedMediaCollection.toJSON();
            sliderModel = App.request("create:new:slider:model", sliderData);
            return sliderModel.save({
              wait: true
            });
          };
        })(this));
        this.listenTo(layout, 'show', (function(_this) {
          return function() {
            App.execute("start:media:upload:app", {
              region: layout.uploadRegion
            });
            App.execute("start:media:grid:app", {
              region: layout.gridRegion
            });
            return App.execute("start:media:selected:app", {
              region: layout.selectedRegion,
              collection: _this.selectedMediaCollection
            });
          };
        })(this));
        return this.show(layout);
      };

      NewSliderController.prototype.onClose = function() {
        delete this.selectedMediaCollection;
        return App.navigate('slider-manager');
      };

      NewSliderController.prototype.onShow = function() {
        return App.navigate('slider-manager/new');
      };

      return NewSliderController;

    })(AppController);
    NewSliderLayout = (function(_super) {
      __extends(NewSliderLayout, _super);

      function NewSliderLayout() {
        return NewSliderLayout.__super__.constructor.apply(this, arguments);
      }

      NewSliderLayout.prototype.template = '<div class="form-group"><input type="text" class="form-control" name="slider-name"/></div> <ul class="nav nav-tabs"> <li><a href="#upload-media-region" data-toggle="tab">Upload</a></li> <li class="active"><a href="#selected-media" data-toggle="tab">All Media</a></li> </ul> <div class="tab-content"> <div id="upload-media-region" class="tab-pane"></div> <div id="selected-media" class="tab-pane active"> <div class="row"> <div class="col-md-9"><div id="grid-media-region"></div></div> <div class="col-md-3"><div id="selected-media-region"></div></div> </div> </div> </div> <button class="btn btn-primary create-new-slider"> Create New Slider </button> <button class="btn cancel-new-slider"> Cancel </button>';

      NewSliderLayout.prototype.regions = {
        uploadRegion: '#upload-media-region',
        gridRegion: '#grid-media-region',
        selectedRegion: '#selected-media-region'
      };

      NewSliderLayout.prototype.events = {
        'click button.create-new-slider': function() {
          var data;
          data = {};
          return data.slider_name = this.$el.find('input[name="slider-name"]').val();
        },
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        }
      };

      return NewSliderLayout;

    })(Marionette.Layout);
    return App.commands.setHandler('start:create:new:slider', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new NewSliderController({
        region: opts.region
      });
    });
  });
});
