var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.LanguageSwitcher.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageSwitcherView = (function(_super) {
      __extends(LanguageSwitcherView, _super);

      function LanguageSwitcherView() {
        return LanguageSwitcherView.__super__.constructor.apply(this, arguments);
      }

      LanguageSwitcherView.prototype.className = 'logo';

      LanguageSwitcherView.prototype.template = '{{#placeholder}} <div id="lang_sel"> <ul> <li> <a href="#" class="lang_sel_sel icl-nb"> <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/nb.png" alt="nb" title="Norwegian Bokmål">&nbsp;Norwegian Bokmål</a> <ul> <li class="icl-en"> <a href="http://localhost/impruw/wpmlsetup1/en/about-us-en/"> <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt="en" title="English">&nbsp;English </a> </li> <li class="icl-es"> <a href="http://localhost/impruw/wpmlsetup1/en/about-us-en/"> <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt="es" title="Spanish">&nbsp;Spanish </a> </li> </ul> </li> </ul> </div> {{/placeholder}}';

      LanguageSwitcherView.prototype.mixinTemplateHelpers = function(data) {
        data = LanguageSwitcherView.__super__.mixinTemplateHelpers.call(this, data);
        data.placeholder = true;
        return data;
      };

      LanguageSwitcherView.prototype.onShow = function() {
        this.$el.attr("data-content", "Helps you switch between various languages in your site </a>");
        return this.$el.popover({
          html: true,
          placement: 'top'
        });
      };

      return LanguageSwitcherView;

    })(Marionette.ItemView);
  });
});
