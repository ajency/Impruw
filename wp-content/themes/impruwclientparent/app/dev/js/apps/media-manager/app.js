// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'controllers/base-controller', 'text!apps/media-manager/templates/outer.html', 'apps/media-manager/upload/controller', 'apps/media-manager/grid/controller', 'apps/media-manager/edit-media/controller'], function(App, AppController, outerTpl) {
    return App.module('MediaManager', function(MediaManager, App, Backbone, Marionette, $, _) {
      var API, OuterLayout, ShowController, _ref, _ref1, _ref2;
      MediaManager.Router = (function(_super) {
        __extends(Router, _super);

        function Router() {
          _ref = Router.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Router.prototype.appRoutes = {
          'media-manager': 'show'
        };

        return Router;

      })(Marionette.AppRouter);
      ShowController = (function(_super) {
        __extends(ShowController, _super);

        function ShowController() {
          _ref1 = ShowController.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        ShowController.prototype.initialize = function(opt) {
          var _this = this;
          if (opt == null) {
            opt = {};
          }
          this.layout = this._getLayout();
          this.show(this.layout);
          MediaManager.Upload.start({
            region: this.layout.uploadRegion
          });
          MediaManager.Grid.start({
            region: this.layout.gridRegion
          });
          MediaManager.EditMedia.start();
          this.listenTo(this.layout.gridRegion, "media:element:clicked", function(media) {
            return App.vent.trigger("media:element:clicked", media, _this.layout.editMediaRegion);
          });
          return App.getRegion('elementsBoxRegion').hide();
        };

        ShowController.prototype.onClose = function() {
          App.MediaManager.Upload.stop();
          MediaManager.Grid.stop();
          MediaManager.EditMedia.stop();
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
          _ref2 = OuterLayout.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        OuterLayout.prototype.template = outerTpl;

        OuterLayout.prototype.regions = {
          uploadRegion: '#upload-region',
          gridRegion: '#grid-region',
          editMediaRegion: '#edit-media-region'
        };

        OuterLayout.prototype.dialogOptions = {
          modal_title: 'Media Manager'
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
      MediaManager.on("start", function() {
        return new MediaManager.Router({
          controller: API
        });
      });
      return MediaManager.on("stop", function() {
        return App.vent.off("media:element:clicked");
      });
    });
  });

}).call(this);
