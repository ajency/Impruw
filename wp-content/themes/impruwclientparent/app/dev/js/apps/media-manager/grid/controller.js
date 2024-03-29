var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/media-manager/grid/views'], function(App, AppController) {
  return App.module("MediaManager.Grid", function(Grid, App) {
    this.startWithParent = false;
    Grid.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var mediaCollection, view;
        mediaCollection = App.request("fetch:media", true);
        view = this._getView(mediaCollection);
        this.listenTo(view, "itemview:media:element:clicked", (function(_this) {
          return function(iv) {
            return Marionette.triggerMethod.call(_this.region, "media:element:clicked", Marionette.getOption(iv, 'model'));
          };
        })(this));
        return this.show(view, {
          loading: true
        });
      };

      Controller.prototype._getView = function(mediaCollection) {
        return new Grid.Views.GridView({
          collection: mediaCollection
        });
      };

      return Controller;

    })(AppController);
    return Grid.on('start', (function(_this) {
      return function(options) {
        return new Grid.Controller({
          region: options.region
        });
      };
    })(this));
  });
});
