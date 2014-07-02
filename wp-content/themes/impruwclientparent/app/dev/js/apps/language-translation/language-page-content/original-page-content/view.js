var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], function(App, originalpageviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.OriginalPage.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalPageItemView = (function(_super) {
      __extends(OriginalPageItemView, _super);

      function OriginalPageItemView() {
        return OriginalPageItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalPageItemView.prototype.template = originalpageviewTpl;

      return OriginalPageItemView;

    })(Marionette.ItemView);
  });
});
