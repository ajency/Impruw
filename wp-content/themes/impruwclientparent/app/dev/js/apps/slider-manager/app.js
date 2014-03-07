var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/slider-manager/new/newcontroller', 'apps/slider-manager/edit-slider/editcontroller', 'apps/slider-manager/grid/gridcontroller'], function(App, AppController) {
  return App.module('SliderManager', function(SliderManager, App, Backbone, Marionette, $, _) {
    var API, OuterLayout, SliderManagerController;
    SliderManager.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'slider-manager': 'show',
        'slider-manager/edit/:id': 'edit'
      };

      return Router;

    })(Marionette.AppRouter);
    SliderManagerController = (function(_super) {
      __extends(SliderManagerController, _super);

      function SliderManagerController() {
        return SliderManagerController.__super__.constructor.apply(this, arguments);
      }

      SliderManagerController.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.sliderCollection = App.request("get:sliders");
        this.layout = this._getLayout();
        this.listenTo(this._getSliderManagerRegion(), "create:new:slider", (function(_this) {
          return function() {
            return _this._startCreateSliderApp();
          };
        })(this));
        this.listenTo(this._getSliderManagerRegion(), "edit:slider", (function(_this) {
          return function(id) {
            return _this._startEditSliderApp(id);
          };
        })(this));
        this.listenTo(this._getSliderManagerRegion(), "cancel:create:slider cancel:edit:slider", (function(_this) {
          return function() {
            return _this._startGridApp();
          };
        })(this));
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            var id;
            if (opt.sliderId) {
              id = opt.sliderId;
            }
            return _this._startEditSliderApp(id);
          };
        })(this));
        return this.show(this.layout);
      };

      SliderManagerController.prototype._getLayout = function() {
        return new OuterLayout();
      };

      SliderManagerController.prototype._getSliderManagerRegion = function() {
        return this.layout.sliderManagerRegion;
      };

      SliderManagerController.prototype._startGridApp = function() {
        return App.execute("show:sliders:grid", {
          collection: this.sliderCollection,
          region: this._getSliderManagerRegion()
        });
      };

      SliderManagerController.prototype._startCreateSliderApp = function() {
        return App.execute("show:create:new:slider", {
          region: this._getSliderManagerRegion()
        });
      };

      SliderManagerController.prototype._startEditSliderApp = function(id) {
        return App.execute("show:edit:slider", {
          sliderId: id,
          region: this._getSliderManagerRegion()
        });
      };

      SliderManagerController.prototype.onClose = function() {
        return App.navigate('');
      };

      return SliderManagerController;

    })(AppController);
    OuterLayout = (function(_super) {
      __extends(OuterLayout, _super);

      function OuterLayout() {
        return OuterLayout.__super__.constructor.apply(this, arguments);
      }

      OuterLayout.prototype.template = '<div id="slider-manager-region"></div>';

      OuterLayout.prototype.className = 'slider-mgr';

      OuterLayout.prototype.regions = {
        sliderManagerRegion: '#slider-manager-region'
      };

      OuterLayout.prototype.dialogOptions = {
        modal_title: 'Slider Manager'
      };

      return OuterLayout;

    })(Marionette.Layout);
    API = {
      show: function() {
        return new SliderManagerController({
          region: App.dialogRegion
        });
      },
      edit: function(mixed) {
        return new SliderManagerController({
          region: App.dialogRegion,
          collection: _.isObject(mixed) ? mixed : false,
          sliderId: _.isNumber(sliderId) ? sliderId : false
        });
      }
    };
    return SliderManager.on("start", function() {
      return new SliderManager.Router({
        controller: API
      });
    });
  });
});
