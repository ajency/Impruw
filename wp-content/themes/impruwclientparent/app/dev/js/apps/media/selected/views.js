var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App, mediaTpl, layoutTpl) {
  return App.module('Media.Selected.Views', function(Views, App) {
    var SelectedSingle;
    SelectedSingle = (function(_super) {
      __extends(SelectedSingle, _super);

      function SelectedSingle() {
        return SelectedSingle.__super__.constructor.apply(this, arguments);
      }

      SelectedSingle.prototype.template = '';

      SelectedSingle.prototype.className = 'media';

      SelectedSingle.prototype.tagName = 'img';

      SelectedSingle.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      SelectedSingle.prototype.onRender = function() {
        this.$el.width('50px').height('50px');
        return this.$el.attr('src', this.model.get('sizes').thumbnail.url);
      };

      return SelectedSingle;

    })(Marionette.ItemView);
    return Views.SelectedView = (function(_super) {
      __extends(SelectedView, _super);

      function SelectedView() {
        return SelectedView.__super__.constructor.apply(this, arguments);
      }

      SelectedView.prototype.className = 'row';

      SelectedView.prototype.template = '<div id="selected-images"></div>';

      SelectedView.prototype.itemView = SelectedSingle;

      SelectedView.prototype.itemViewContainer = '#selected-images';

      return SelectedView;

    })(Marionette.CompositeView);
  });
});
