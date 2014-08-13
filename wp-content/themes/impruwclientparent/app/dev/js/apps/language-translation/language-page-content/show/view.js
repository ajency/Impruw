var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-page-content/templates/languagepagecontentview.html'], function(App, languagepagecontentviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguagePageContentLayout = (function(_super) {
      __extends(LanguagePageContentLayout, _super);

      function LanguagePageContentLayout() {
        return LanguagePageContentLayout.__super__.constructor.apply(this, arguments);
      }

      LanguagePageContentLayout.prototype.template = languagepagecontentviewTpl;

      LanguagePageContentLayout.prototype.className = 'tab-content';

      LanguagePageContentLayout.prototype.regions = {
        originalPageContent: ".original-page-content",
        translatedPageContent: ".translated-page-content"
      };

      return LanguagePageContentLayout;

    })(Marionette.Layout);
  });
});
