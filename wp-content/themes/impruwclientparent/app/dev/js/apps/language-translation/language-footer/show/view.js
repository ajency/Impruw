var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-footer/show/templates/languagepagefooterview.html'], function(App, pagefooterviewTpl) {
  return App.module('LanguageApp.LanguageFooterContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageFooterContentLayout = (function(_super) {
      __extends(LanguageFooterContentLayout, _super);

      function LanguageFooterContentLayout() {
        return LanguageFooterContentLayout.__super__.constructor.apply(this, arguments);
      }

      LanguageFooterContentLayout.prototype.template = pagefooterviewTpl;

      LanguageFooterContentLayout.prototype.className = 'tab-content';

      LanguageFooterContentLayout.prototype.regions = {
        originalFooterContent: ".original-page-footer-content",
        translatedFooterContent: ".translated-page-footer-content"
      };

      return LanguageFooterContentLayout;

    })(Marionette.Layout);
  });
});
