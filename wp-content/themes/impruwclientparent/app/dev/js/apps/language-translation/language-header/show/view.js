var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-header/show/templates/languagepageheaderview.html'], function(App, pageheaderviewTpl) {
  return App.module('LanguageApp.LanguageHeaderContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageHeaderContentLayout = (function(_super) {
      __extends(LanguageHeaderContentLayout, _super);

      function LanguageHeaderContentLayout() {
        return LanguageHeaderContentLayout.__super__.constructor.apply(this, arguments);
      }

      LanguageHeaderContentLayout.prototype.template = pageheaderviewTpl;

      LanguageHeaderContentLayout.prototype.className = 'tab-content';

      LanguageHeaderContentLayout.prototype.regions = {
        originalHeaderContent: ".original-page-header-content",
        translatedHeaderContent: ".translated-page-header-content"
      };

      return LanguageHeaderContentLayout;

    })(Marionette.Layout);
  });
});
