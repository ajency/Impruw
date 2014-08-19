var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Widget.Views', function(Views, App) {
    return Views.WidgetView = (function(_super) {
      __extends(WidgetView, _super);

      function WidgetView() {
        return WidgetView.__super__.constructor.apply(this, arguments);
      }

      WidgetView.prototype.className = 'widget embed-responsive ';

      WidgetView.prototype.templates = '';

      WidgetView.prototype.modelEvents = {
        'change:widgetCode': 'render'
      };

      WidgetView.prototype.onRender = function() {
        var height, ratio, widgetHtml, width;
        console.log('in on render');
        widgetHtml = $.parseHTML(_.stripslashes(this.model.get('widgetCode')));
        this.$el.html(widgetHtml);
        if (this.model.get('type') === 'youtube') {
          this.$el.find('iframe').wrap('<div class="embed-responsive-item"></div>');
          width = this.$el.find('iframe').attr('width');
          height = this.$el.find('iframe').attr('height');
          ratio = 100 * height / width;
          console.log(ratio);
          this.$el.css('padding-bottom', "" + ratio + "%");
        }
        return console.log(widgetHtml);
      };

      WidgetView.prototype.onShow = function() {
        return this.$el.closest('.column').on('class:changed', (function(_this) {
          return function() {
            return _this.onRender();
          };
        })(this));
      };

      return WidgetView;

    })(Marionette.ItemView);
  });
});
