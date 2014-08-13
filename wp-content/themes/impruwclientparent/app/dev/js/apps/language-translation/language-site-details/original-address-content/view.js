var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-site-details/original-address-content/templates/originaladdressview.html'], function(App, originaladdressviewTpl) {
  return App.module('LanguageApp.LanguageSiteContent.OriginalAddress.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalAddressItemView = (function(_super) {
      __extends(OriginalAddressItemView, _super);

      function OriginalAddressItemView() {
        return OriginalAddressItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalAddressItemView.prototype.template = originaladdressviewTpl;

      OriginalAddressItemView.prototype.serializeData = function() {
        var data;
        data = OriginalAddressItemView.__super__.serializeData.call(this);
        data.default_language = _.polyglot.t(data.default_language);
        return data;
      };

      return OriginalAddressItemView;

    })(Marionette.ItemView);
  });
});
