var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Logo.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LogoView = (function(_super) {
      __extends(LogoView, _super);

      function LogoView() {
        return LogoView.__super__.constructor.apply(this, arguments);
      }

      LogoView.prototype.className = 'logo';

      LogoView.prototype.template = '{{#image}} <img src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/> <div class="clearfix"></div> {{/image}} {{#placeholder}} <div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Logo</div> {{/placeholder}}';

      LogoView.prototype.mixinTemplateHelpers = function(data) {
        data = LogoView.__super__.mixinTemplateHelpers.call(this, data);
        if (this.model.isNew()) {
          data.placeholder = true;
        } else {
          data.image = true;
          data.imageurl = function() {
            var url;
            if (_.isUndefined(this.sizes['medium'])) {
              url = this.sizes['full'].url;
            } else {
              url = this.sizes['medium'].url;
            }
            return url;
          };
        }
        return data;
      };

      LogoView.prototype.events = {
        'click': function(e) {
          return e.stopPropagation();
        },
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      LogoView.prototype.onShow = function() {
        this.$el.attr("data-content", " " + _.polyglot.t('Update logo in your') + (" <a href='" + SITEURL + "/dashboard/#/site-profile' target='_BLANK'>") + _.polyglot.t('site profile') + "</a>");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return LogoView;

    })(Marionette.ItemView);
  });
});
