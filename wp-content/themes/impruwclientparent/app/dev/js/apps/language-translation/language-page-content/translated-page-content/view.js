var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-page-content/translated-page-content/templates/translatedpageview.html'], function(App, translatedpageviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedPage.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedPageItemView = (function(_super) {
      __extends(TranslatedPageItemView, _super);

      function TranslatedPageItemView() {
        return TranslatedPageItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPageItemView.prototype.template = translatedpageviewTpl;

      return TranslatedPageItemView;

    })(Marionette.ItemView);
  });
});
