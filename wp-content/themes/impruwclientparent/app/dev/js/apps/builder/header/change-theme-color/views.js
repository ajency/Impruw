var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('ChangeThemeColorApp.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, SingleSetView;
    SingleSetView = (function(_super) {
      __extends(SingleSetView, _super);

      function SingleSetView() {
        return SingleSetView.__super__.constructor.apply(this, arguments);
      }

      SingleSetView.prototype.tagName = 'li';

      SingleSetView.prototype.template = '<div class="thumbnail" id="flipthis"> <div class="indicator"><span class="glyphicon glyphicon-ok"></span></div> <div class="colors"></div> <div class="caption"> <h3>{{name}}</h3> <p> <a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> <a href="#" class="btn btn-xs btn-default" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a> </p> </div> </div>';

      SingleSetView.prototype.onShow = function() {
        this.model.unset('name');
        return _.each(this.model.attributes, (function(_this) {
          return function(colorValue, index) {
            return _this.$el.find('.colors').append("<span style='background: " + colorValue + ";'>&nbsp;</span>");
          };
        })(this));
      };

      SingleSetView.prototype.serializeData = function() {
        var data;
        data = SingleSetView.__super__.serializeData.call(this);
        return data;
      };

      SingleSetView.prototype.events = {
        'click .apply-theme-color': function() {
          return this.trigger("change:theme:color", this.model);
        }
      };

      return SingleSetView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.tagName = 'li';

      EmptyView.prototype.template = 'No theme color set found';

      return EmptyView;

    })(Marionette.ItemView);
    return Views.ThemeColorSetView = (function(_super) {
      __extends(ThemeColorSetView, _super);

      function ThemeColorSetView() {
        return ThemeColorSetView.__super__.constructor.apply(this, arguments);
      }

      ThemeColorSetView.prototype.template = ' <ul class="color-set-list"></ul>';

      ThemeColorSetView.prototype.itemView = SingleSetView;

      ThemeColorSetView.prototype.emptyView = EmptyView;

      ThemeColorSetView.prototype.itemViewContainer = '.color-set-list';

      return ThemeColorSetView;

    })(Marionette.CompositeView);
  });
});
