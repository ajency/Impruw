var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Widget.Views', function(Views, App) {
    return Views.WidgetView = (function(_super) {
      __extends(WidgetView, _super);

      function WidgetView() {
        return WidgetView.__super__.constructor.apply(this, arguments);
      }

      WidgetView.prototype.className = 'widget';

      WidgetView.prototype.templates = '';

      WidgetView.prototype.onRender = function() {
        var html;
        console.log('in on render');
        html = $.parseHTML(_.stripslashes(this.model.get('htmlData')));
        this.trigger('save:html:data', $(html).get(0));
        $(html).find('div').attr('data-width', this.$el.width());
        console.log(html);
        return this.$el.html(html);
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
