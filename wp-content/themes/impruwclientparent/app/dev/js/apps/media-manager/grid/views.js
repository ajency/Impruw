var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/media-manager/grid/templates/media.html'], function(App, mediaTpl, layoutTpl) {
  return App.module('MediaManager.Grid.Views', function(Views, App) {
    var MediaView;
    MediaView = (function(_super) {
      __extends(MediaView, _super);

      function MediaView() {
        return MediaView.__super__.constructor.apply(this, arguments);
      }

      MediaView.prototype.template = mediaTpl;

      MediaView.prototype.className = 'col-sm-2 single-img';

      MediaView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        },
        'click': function(e) {
          return this.trigger("media:element:clicked");
        }
      };

      return MediaView;

    })(Marionette.ItemView);
    return Views.GridView = (function(_super) {
      __extends(GridView, _super);

      function GridView() {
        return GridView.__super__.constructor.apply(this, arguments);
      }

      GridView.prototype.className = 'row';

      GridView.prototype.template = '<div id="selectable-images"></div>';

      GridView.prototype.itemView = MediaView;

      GridView.prototype.itemViewContainer = '#selectable-images';

      GridView.prototype.onCollectionRendered = function() {
        return this.$el.find('#selectable-images').selectable();
      };

      return GridView;

    })(Marionette.CompositeView);
  });
});
