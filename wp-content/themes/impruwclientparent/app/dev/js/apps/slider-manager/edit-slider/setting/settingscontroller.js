var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller'], function(App, AppController) {
  return App.module('SliderManager.EditSlider.Settings', function(Settings, App, Backbone, Marionette, $, _) {
    var CreateSliderView, SettingsController;
    SettingsController = (function(_super) {
      __extends(SettingsController, _super);

      function SettingsController() {
        this.sliderSettingsUpdated = __bind(this.sliderSettingsUpdated, this);
        return SettingsController.__super__.constructor.apply(this, arguments);
      }

      SettingsController.prototype.initialize = function(opt) {
        var view;
        if (opt == null) {
          opt = {};
        }
        this.model = opt.model;
        this.view = view = this._getUpdateSettingsView(this.model);
        this.listenTo(view, "update:slider:with:data", (function(_this) {
          return function(sliderData) {
            _this.model.set(sliderData);
            return _this.model.save({
              wait: true,
              success: _this.sliderSettingsUpdated
            });
          };
        })(this));
        this.show(view);
        return App.navigate("slider-manager/edit/" + this.sliderId + "/settings");
      };

      SettingsController.prototype._getUpdateSettingsView = function(slider) {
        return new CreateSliderView({
          model: slider
        });
      };

      SettingsController.prototype.sliderSettingsUpdated = function() {
        return this.view.triggerMethod("settings:updated");
      };

      return SettingsController;

    })(AppController);
    CreateSliderView = (function(_super) {
      __extends(CreateSliderView, _super);

      function CreateSliderView() {
        return CreateSliderView.__super__.constructor.apply(this, arguments);
      }

      CreateSliderView.prototype.tagName = 'form';

      CreateSliderView.prototype.className = 'form-horizontal';

      CreateSliderView.prototype.template = '<div class="form-group"> <label class="col-md-2 control-label">{{#polyglot}}Slider Name{{/polyglot}}</label> <div class="col-md-10"> <input required type="text" value="{{title}}" name="title" class="form-control" placeholder="{{#polyglot}}Name Your Slider{{/polyglot}}" /> </div> </div> <div class="form-group"> <div class="col-md-10 col-md-offset-2"> <button type="button" class="btn btn-primary update-slider">{{#polyglot}}Update{{/polyglot}}</button> </div> </div>';

      CreateSliderView.prototype.events = {
        'click button.cancel-new-slider': function() {
          return this.trigger("cancel:create:slider");
        },
        'click button.update-slider': function(e) {
          var data;
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            data['alias'] = _.slugify(data['title']);
            data['shortcode'] = "[rev_slider " + data['alias'] + "]";
            return this.trigger("update:slider:with:data", data);
          }
        }
      };

      CreateSliderView.prototype.onSettingsUpdated = function() {
        return this.$el.prepend("<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>");
      };

      return CreateSliderView;

    })(Marionette.ItemView);
    return App.commands.setHandler('show:slider:edit:settings', function(opts) {
      if (opts == null) {
        opts = {};
      }
      return new SettingsController(opts);
    });
  });
});
