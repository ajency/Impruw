var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-menus/show/templates/languagepagemenuview.html'], function(App, pagemenuviewTpl) {
  return App.module('LanguageApp.LanguageMenuContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageMenuContentLayout = (function(_super) {
      __extends(LanguageMenuContentLayout, _super);

      function LanguageMenuContentLayout() {
        return LanguageMenuContentLayout.__super__.constructor.apply(this, arguments);
      }

      LanguageMenuContentLayout.prototype.template = pagemenuviewTpl;

      LanguageMenuContentLayout.prototype.className = 'tab-content';

      LanguageMenuContentLayout.prototype.regions = {
        originalMenuContent: ".original-page-menu-content",
        translatedMenuContent: ".translated-page-menu-content"
      };

      return LanguageMenuContentLayout;

    })(Marionette.Layout);
  });
});
