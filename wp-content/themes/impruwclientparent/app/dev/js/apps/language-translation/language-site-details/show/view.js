var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-site-details/templates/languagesitedetailsview.html'], function(App, languagesitedetailsviewTpl) {
  return App.module('LanguageApp.LanguageSiteContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageSiteContentLayout = (function(_super) {
      __extends(LanguageSiteContentLayout, _super);

      function LanguageSiteContentLayout() {
        return LanguageSiteContentLayout.__super__.constructor.apply(this, arguments);
      }

      LanguageSiteContentLayout.prototype.template = languagesitedetailsviewTpl;

      LanguageSiteContentLayout.prototype.className = 'tab-content';

      LanguageSiteContentLayout.prototype.regions = {
        originalSiteContent: ".original-site-content",
        translatedSiteContent: ".translated-site-content"
      };

      return LanguageSiteContentLayout;

    })(Marionette.Layout);
  });
});
