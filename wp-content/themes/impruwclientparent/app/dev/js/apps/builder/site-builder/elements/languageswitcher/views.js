var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.LanguageSwitcher.Views', function(Views, App, Backbone, Marionette, $, _) {
    var LanguageSwitcherItemView;
    LanguageSwitcherItemView = (function(_super) {
      __extends(LanguageSwitcherItemView, _super);

      function LanguageSwitcherItemView() {
        return LanguageSwitcherItemView.__super__.constructor.apply(this, arguments);
      }

      LanguageSwitcherItemView.prototype.template = '{{^isDefaultLanguage}} <li class="icl-{{code}}"> <a href="#"> <img class="iclflag" src="{{pluginUri}}/sitepress-multilingual-cms/res/flags/{{code}}.png" alt="{{code}}" title="{{languageName}}"> &nbsp;{{languageName}} </a> </li> {{/isDefaultLanguage}}';

      LanguageSwitcherItemView.prototype.mixinTemplateHelpers = function(data) {
        data.pluginUri = function() {
          var pluginUri;
          pluginUri = PLUGIN_URI;
          return pluginUri;
        };
        return data;
      };

      return LanguageSwitcherItemView;

    })(Marionette.ItemView);
    return Views.LanguageSwitcherView = (function(_super) {
      __extends(LanguageSwitcherView, _super);

      function LanguageSwitcherView() {
        return LanguageSwitcherView.__super__.constructor.apply(this, arguments);
      }

      LanguageSwitcherView.prototype.className = 'lang-sel';

      LanguageSwitcherView.prototype.template = '{{#placeholder}} <div id="lang_sel"> <ul> <li> <a href="#" class="lang_sel_sel icl-{{defaultLanguageCode}}"> <img class="iclflag" src="{{pluginUri}}/sitepress-multilingual-cms/res/flags/{{defaultLanguageCode}}.png" alt="{{defaultLanguageCode}}" title="{{defaultLanguageName}}">&nbsp;{{defaultLanguageName}} </a> <ul id="language-selector-lang"> </ul> </li> </ul> </div> {{/placeholder}}';

      LanguageSwitcherView.prototype.itemView = LanguageSwitcherItemView;

      LanguageSwitcherView.prototype.itemViewContainer = '#language-selector-lang';

      LanguageSwitcherView.prototype.onRender = function() {
        var className, style;
        style = Marionette.getOption(this, 'style');
        className = _.slugify(style);
        return this.$el.addClass(className);
      };

      LanguageSwitcherView.prototype.mixinTemplateHelpers = function(data) {
        data = LanguageSwitcherView.__super__.mixinTemplateHelpers.call(this, data);
        data.placeholder = true;
        data.defaultLanguageCode = function() {
          var defaultLanguageCode;
          defaultLanguageCode = WPML_DEFAULT_LANG;
          return defaultLanguageCode;
        };
        data.defaultLanguageName = function() {
          var defaultLanguageName;
          defaultLanguageName = WPML_DEFAULT_LANGUAGE_NAME;
          return defaultLanguageName;
        };
        data.pluginUri = function() {
          var pluginUri;
          pluginUri = PLUGIN_URI;
          return pluginUri;
        };
        return data;
      };

      return LanguageSwitcherView;

    })(Marionette.CompositeView);
  });
});
