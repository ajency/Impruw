var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/media/grid/views'], function(App, AppController) {
  return App.module("Media.Grid", function(Grid, App) {
    Grid.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var MediaCollection, view;
        MediaCollection = App.request("fetch:media", true);
        this.mediaCollection = window.f = new MediaCollection;
        this.mediaCollection.fetch();
        view = this._getView(this.mediaCollection);
        this.listenTo(view, "itemview:media:element:selected", (function(_this) {
          return function(iv) {
            return Marionette.triggerMethod.call(_this.region, "media:element:selected", Marionette.getOption(iv, 'model'));
          };
        })(this));
        this.listenTo(view, "itemview:media:element:unselected", (function(_this) {
          return function(iv) {
            return Marionette.triggerMethod.call(_this.region, "media:element:unselected", Marionette.getOption(iv, 'model'));
          };
        })(this));
        this.listenTo(view, "itemview:delete:media:image", (function(_this) {
          return function(iv, model) {
            return _this.deleteImage(model);
          };
        })(this));
        this.listenTo(view, "itemview:show:image:editor", (function(_this) {
          return function(iv, model) {
            var editView, ratio, _region;
            _region = _this.region;
            ratio = App.currentImageRatio;
            editView = App.request("get:image:editor:view", model, {
              aspectRatio: ratio
            });
            view.triggerMethod("show:edit:image", editView);
            return view.listenTo(editView, "image:editing:cancelled", function() {
              view.triggerMethod("image:editing:cancelled");
              return _.delay(function() {
                return Marionette.triggerMethod.call(_region, "media:element:selected", model);
              });
            });
          };
        })(this));
        App.commands.setHandler("new:media:added", (function(_this) {
          return function(media, showGrid) {
            if (showGrid == null) {
              showGrid = false;
            }
            _this.mediaCollection.add(media);
            if (showGrid) {
              return _this.mediaCollection.trigger('show:grid');
            }
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

      Controller.prototype.deleteImage = function(imageModel) {
        return imageModel.destroy({
          allData: false,
          wait: true
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler('start:media:grid:app', (function(_this) {
      return function(options) {
        return new Grid.Controller({
          region: options.region
        });
      };
    })(this));
  });
});
