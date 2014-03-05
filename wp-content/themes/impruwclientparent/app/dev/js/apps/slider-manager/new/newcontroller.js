var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.NewSlider', function(NewSlider, App, Backbone, Marionette, $, _) {
    var CreateSliderView, NewSliderController;
    NewSliderController = (function(_super) {
      __extends(NewSliderController, _super);

      function NewSliderController() {
        this.newSliderCreated = __bind(this.newSliderCreated, this);
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
        this.listenTo(view, "create:new:slider:with:data", (function(_this) {
          return function(sliderData) {
            var sliderModel;
            sliderModel = App.request("create:new:slider:model", sliderData);
            return sliderModel.save({
              wait: true,
              success: _this.newSliderCreated
            });
          };
        })(this));
        return this.show(view);
      };

      NewSliderController.prototype.newSliderCreated = function(model, response, options) {
        var sliderCollection;
        sliderCollection = App.request("get:collection", 'slidercollection');
        sliderCollection.add(model);
        return Marionette.triggerMethod.call(this.region, "cancel:create:slider");
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

      CreateSliderView.prototype.tagName = 'form';

      CreateSliderView.prototype.className = 'form-horizontal';

      CreateSliderView.prototype.template = '<div class="form-group"> <label class="col-md-2 control-label">Slider Name</label> <div class="col-md-10"> <input required type="text" name="title" class="form-control" placeholder="Name Your Slider" /> </div> </div> <div class="form-group"> <div class="col-md-10 col-md-offset-2"> <button type="button" class="btn btn-primary create-new-slider">Create Slider</button> <button type="btutton" class="btn cancel-new-slider">Cancel</button> </div> </div>';

      CreateSliderView.prototype.events = {
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        },
        'click button.create-new-slider': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            data['alias'] = _.slugify(data['title']);
            data['shortcode'] = "[rev_slider " + data['alias'] + "]";
            return this.trigger("create:new:slider:with:data", data);
          }
        }
      };

      return CreateSliderView;

    })(Marionette.ItemView);
    return App.commands.setHandler('show:create:new:slider', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new NewSliderController(opts);
    });
  });
});
