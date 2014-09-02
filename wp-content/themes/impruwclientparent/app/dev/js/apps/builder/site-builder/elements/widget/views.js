var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Widget.Views', function(Views, App) {
    return Views.WidgetView = (function(_super) {
      __extends(WidgetView, _super);

      function WidgetView() {
        return WidgetView.__super__.constructor.apply(this, arguments);
      }

      WidgetView.prototype.className = 'widget  ';

      WidgetView.prototype.templates = '';

      WidgetView.prototype.modelEvents = {
        'change:widgetCode': 'renderWidget',
        'change:type': 'renderWidget'
      };

      WidgetView.prototype.mixinTemplateHelpers = function(data) {
        data = WidgetView.__super__.mixinTemplateHelpers.call(this, data);
        console.log('mixin');
        return data;
      };

      WidgetView.prototype.renderWidget = function() {
        var aspectRatio, height, widgetHtml, width;
        if (this.model.get('widgetCode') === '') {
          if (this.model.get('type') === '') {
            this.$el.html('<div class="empty-view"><span class="bicon icon-uniF162"></span>' + _.polyglot.t('Choose your widget type and add your embed code from the settings') + '</div>');
          } else if (this.model.get('type') === 'youtube') {
            this.$el.html('<div class="empty-view"><span class="bicon icon-uniF162"></span>' + _.polyglot.t('Add Youtube embed code in the settings') + '</div>');
          } else if (this.model.get('type') === 'facebook') {
            this.$el.html('<div class="empty-view"><span class="bicon icon-uniF162"></span>' + _.polyglot.t('Add Facebook embed code in the settings') + '</div>');
          } else if (this.model.get('type') === 'tripadvisor') {
            this.$el.html('<div class="empty-view"><span class="bicon icon-uniF162"></span>' + _.polyglot.t('Add Tripadvisor embed code in the settings') + '</div>');
          }
          return;
        }
        widgetHtml = $.parseHTML(_.stripslashes(this.model.get('widgetCode')));
        this.$el.html(widgetHtml);
        if (this.model.get('type') === 'youtube') {
          this.$el.find('iframe').wrap('<div class="embed-responsive-item"></div>');
          width = this.$el.find('iframe').attr('width');
          height = this.$el.find('iframe').attr('height');
          aspectRatio = 100 * height / width;
          this.model.set('aspectRatio', aspectRatio);
          this.$el.addClass('embed-responsive');
          this.$el.css('padding-bottom', "" + aspectRatio + "%");
        }
        if (this.model.get('type') === 'facebook') {
          this.$el.removeClass('embed-responsive');
          this.$el.find('div').attr('data-width', this.$el.closest('.element-markup').width());
          this.$el.removeAttr('style');
          (function(d, s, id) {
            var fjs, js;
            js = void 0;
            if (d.getElementById(id)) {
              return;
            }
            fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
          })(document, "script", "facebook-jssdk");
        }
        if (this.model.get('type') === 'tripadvisor') {
          this.$el.removeAttr('style');
          return this.$el.html(_.stripslashes(this.model.get('widgetCode')));
        }
      };

      WidgetView.prototype.onShow = function() {
        this.renderWidget();
        return this.$el.closest('.column').on('class:changed', (function(_this) {
          return function() {
            return _this.renderWidget();
          };
        })(this));
      };

      return WidgetView;

    })(Marionette.ItemView);
  });
});
