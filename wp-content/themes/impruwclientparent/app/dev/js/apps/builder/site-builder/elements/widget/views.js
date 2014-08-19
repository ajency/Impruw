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
        'change:widgetCode': 'render',
        'change:type': 'render'
      };

      WidgetView.prototype.mixinTemplateHelpers = function(data) {
        data = WidgetView.__super__.mixinTemplateHelpers.call(this, data);
        console.log('mixin');
        return data;
      };

      WidgetView.prototype.onRender = function() {
        var aspectRatio, height, widgetHtml, width;
        console.log('in on render');
        widgetHtml = $.parseHTML(_.stripslashes(this.model.get('widgetCode')));
        this.$el.html(widgetHtml);
        if (this.model.get('type') === 'youtube') {
          this.$el.find('iframe').wrap('<div class="embed-responsive-item"></div>');
          width = this.$el.find('iframe').attr('width');
          height = this.$el.find('iframe').attr('height');
          aspectRatio = 100 * height / width;
          this.model.set('aspectRatio', aspectRatio);
          this.$el.css('padding-bottom', "" + aspectRatio + "%");
        }
        if (this.model.get('type') === 'facebook') {
          this.$el.removeAttr('style');
          this.$el.html('<div>the facebook placeholder comes here</div>');
        }
        if (this.model.get('type') === 'tripadvisor') {
          this.$el.removeAttr('style');
          this.$el.html('<div>the tripadvisor placeholder comes here</div>');
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
