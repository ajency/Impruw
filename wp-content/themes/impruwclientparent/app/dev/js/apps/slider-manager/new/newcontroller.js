var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.NewSlider', function(NewSlider, App, Backbone, Marionette, $, _) {
    var CreateSliderView, ErrorView, NewSliderController, NewSliderLayout;
    NewSliderController = (function(_super) {
      __extends(NewSliderController, _super);

      function NewSliderController() {
        return NewSliderController.__super__.constructor.apply(this, arguments);
      }

      NewSliderController.prototype.initialize = function(opt) {
        var view;
        view = this._getCreateSliderFormView();
        this.listenTo(view, "cancel:create:slider", (function(_this) {
          return function() {
            Marionette.triggerMethod.call(_this.region, "cancel:create:slider");
            return view.close();
          };
        })(this));
        this.listenTo(view, "create:new:slider", (function(_this) {
          return function(sliderData) {
            var sliderModel;
            sliderModel = App.request("create:new:slider:model", sliderData);
            return sliderModel.save({
              wait: true
            });
          };
        })(this));
        return this.show(view);
      };

      NewSliderController.prototype._getCreateSliderFormView = function() {
        return new CreateSliderView;
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
    CreateSliderView = (function(_super) {
      __extends(CreateSliderView, _super);

      function CreateSliderView() {
        return CreateSliderView.__super__.constructor.apply(this, arguments);
      }

      CreateSliderView.prototype.template = 'form markup here. with button <button class="btn cancel-new-slider"> Cancel </button>';

      CreateSliderView.prototype.events = {
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        }
      };

      return CreateSliderView;

    })(Marionette.ItemView);
    NewSliderLayout = (function(_super) {
      __extends(NewSliderLayout, _super);

      function NewSliderLayout() {
        return NewSliderLayout.__super__.constructor.apply(this, arguments);
      }

      NewSliderLayout.prototype.template = '<div class="form-horizontal"> <div class="form-group"> <label class="control-label col-md-2">Slider Name:</label> <div class="col-md-10"> <input type="text" class="form-control" name="slider-name"/> </div> </div> </div> <ul class="nav nav-tabs"> <li><a href="#upload-media-region" data-toggle="tab">Upload</a></li> <li class="active"><a href="#selected-media" data-toggle="tab">All Media</a></li> </ul> <div class="tab-content"> <div id="upload-media-region" class="tab-pane"></div> <div id="selected-media" class="tab-pane active"> <div class="row"> <div class="col-md-9"><div id="grid-media-region"></div></div> <div class="col-md-3"> <h5 class="selected-header">Selected Images:</h5> <div id="selected-media-region"></div> </div> </div> </div> </div> <button class="btn btn-primary create-new-slider"> Create New Slider </button> <button class="btn cancel-new-slider"> Cancel </button>';

      NewSliderLayout.prototype.regions = {
        messageRegion: '#message-region',
        uploadRegion: '#upload-media-region',
        gridRegion: '#grid-media-region',
        selectedRegion: '#selected-media-region'
      };

      NewSliderLayout.prototype.events = {
        'click button.create-new-slider': function() {
          var data;
          data = {};
          data['title'] = this.$el.find('input[name="slider-name"]').val();
          data['alias'] = _.slugify(data['title']);
          data['shortcode'] = "[rev_slider " + data['alias'] + "]";
          return this.trigger("create:new:slider", data);
        },
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        }
      };

      return NewSliderLayout;

    })(Marionette.Layout);
    ErrorView = (function(_super) {
      __extends(ErrorView, _super);

      function ErrorView() {
        return ErrorView.__super__.constructor.apply(this, arguments);
      }

      ErrorView.prototype.template = 'Please select atleast 2 images';

      ErrorView.prototype.tagName = 'div';

      ErrorView.prototype.className = 'alert alert-danger';

      return ErrorView;

    })(Marionette.ItemView);
    return App.commands.setHandler('show:create:new:slider', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new NewSliderController(opts);
    });
  });
});
