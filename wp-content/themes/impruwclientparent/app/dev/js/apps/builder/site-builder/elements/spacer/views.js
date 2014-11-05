var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Spacer.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SpacerView = (function(_super) {
      __extends(SpacerView, _super);

      function SpacerView() {
        return SpacerView.__super__.constructor.apply(this, arguments);
      }

      SpacerView.prototype.template = '<hr class="{{style}}" >';

      SpacerView.prototype.className = 'spacer';

      SpacerView.prototype.onRender = function() {
        this.$el.addClass(this.model.get('type'));
        if (this.model.get('type') !== 'line') {
          return this.$el.find('hr').css('height', this.model.get('height'));
        }
      };

      SpacerView.prototype.onShow = function() {
        if (this.model.get('type') !== 'line') {
          return this.$el.find('hr').resizable({
            helper: "ui-image-resizable-helper",
            handles: "s",
            stop: (function(_this) {
              return function(evt, ui) {
                _this.$el.css('width', 'auto');
                return _this.trigger('set:spacer:height', _this.$el.height());
              };
            })(this)
          });
        }
      };

      return SpacerView;

    })(Marionette.ItemView);
  });
});
