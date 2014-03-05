var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.NewSlider', function(NewSlider, App, Backbone, Marionette, $, _) {
    var CreateSliderView, ErrorView, NewSliderController;
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

      CreateSliderView.prototype.template = '<form class="form-horizontal"> <div class="form-group"> <label class="col-md-2 control-label">Slider Name</label> <div class="col-md-10"> <input type="text" class="form-control" placeholder="Name Your Slider" /> </div> </div> <div class="form-group"> <div class="col-md-10 col-md-offset-2"> <button class="btn btn-primary">Create Slider</button> <button class="btn cancel-new-slider">Cancel</button> </div> </div> </form>';

      CreateSliderView.prototype.events = {
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        }
      };

      return CreateSliderView;

    })(Marionette.ItemView);
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
