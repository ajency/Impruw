var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'text!apps/slider-manager/templates/outer.html'], function(App, AppController, outerTpl) {
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
        this.selectedMediaCollection = App.request("get:empty:media:collection");
        this.layout = this._getLayout();
        this.show(this.layout);
        App.Media.Upload.start({
          region: this.layout.uploadRegion
        });
        App.Media.Grid.start({
          region: this.layout.gridRegion
        });
        App.Media.Selected.start({
          region: this.layout.selectedMediaRegion,
          collection: this.selectedMediaCollection
        });
        this.listenTo(this.layout.gridRegion, "media:element:clicked", (function(_this) {
          return function(media) {
            return _this.selectedMediaCollection.add(media);
          };
        })(this));
        return App.getRegion('elementsBoxRegion').hide();
      };

      ShowController.prototype.onClose = function() {
        App.Media.Upload.stop();
        App.Media.Grid.stop();
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

      OuterLayout.prototype.template = outerTpl;

      OuterLayout.prototype.regions = {
        uploadRegion: '#upload-region',
        gridRegion: '#grid-region',
        selectedMediaRegion: '#selected-media-region'
      };

      OuterLayout.prototype.dialogOptions = {
        modal_title: 'Slider Manager'
      };

      OuterLayout.prototype.events = {
        'click button.media-manager-select': function() {
          return this.trigger("media:selected");
        }
      };

      return OuterLayout;

    })(Marionette.Layout);
    API = {
      show: function() {
        return new ShowController({
          region: App.dialogRegion,
          statApp: 'all-media'
        });
      },
      editMedia: function(model, region) {}
    };
    return SliderManager.on("start", function() {
      return new SliderManager.Router({
        controller: API
      });
    });
  });
});
