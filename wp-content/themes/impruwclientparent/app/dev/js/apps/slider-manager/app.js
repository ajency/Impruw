var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/slider-manager/new/newcontroller', 'apps/slider-manager/grid/gridcontroller'], function(App, AppController) {
  return App.module('SliderManager', function(SliderManager, App, Backbone, Marionette, $, _) {
    var API, OuterLayout, ShowController;
    SliderManager.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.appRoutes = {
        'slider-manager': 'show'
      };

      return Router;

    })(Marionette.AppRouter);
    ShowController = (function(_super) {
      __extends(ShowController, _super);

      function ShowController() {
        return ShowController.__super__.constructor.apply(this, arguments);
      }

      ShowController.prototype.initialize = function(opt) {
        if (opt == null) {
          opt = {};
        }
        this.layout = this._getLayout();
        this.listenTo(this.layout, "show", (function(_this) {
          return function() {
            return App.execute("start:show:all:sliders", {
              region: _this.layout.slidersGridRegion
            });
          };
        })(this));
        this.listenTo(this.layout.slidersGridRegion, "create:new:slider", function() {
          this.layout.slidersGridRegion.hide();
          return App.execute("start:create:new:slider", {
            region: this.layout.newEditSliderRegion
          });
        });
        this.listenTo(this.layout.newEditSliderRegion, "cancel:create:slider", function() {
          return this.layout.slidersGridRegion.unhide();
        });
        App.getRegion('elementsBoxRegion').hide();
        return this.show(this.layout);
      };

      ShowController.prototype.onClose = function() {
        App.navigate('');
        return App.getRegion('elementsBoxRegion').unhide();
      };

      ShowController.prototype._getLayout = function() {
        return new OuterLayout;
      };

      return ShowController;

    })(AppController);
    OuterLayout = (function(_super) {
      __extends(OuterLayout, _super);

      function OuterLayout() {
        return OuterLayout.__super__.constructor.apply(this, arguments);
      }

      OuterLayout.prototype.template = '<div id="slider-grid-region"></div> <div id="new-edit-slider"></div>';

      OuterLayout.prototype.className = 'slider-mgr';

      OuterLayout.prototype.regions = {
        slidersGridRegion: '#slider-grid-region',
        newEditSliderRegion: '#new-edit-slider'
      };

      OuterLayout.prototype.dialogOptions = {
        modal_title: 'Slider Manager'
      };

      return OuterLayout;

    })(Marionette.Layout);
    API = {
      show: function() {
        return new ShowController({
          region: App.dialogRegion
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
