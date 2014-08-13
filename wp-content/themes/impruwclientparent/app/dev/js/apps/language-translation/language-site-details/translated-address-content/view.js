var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-site-details/translated-address-content/templates/translatedaddressview.html'], function(App, translatedaddressviewTpl) {
  return App.module('LanguageApp.LanguageSiteContent.TranslatedAddress.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedAddressItemView = (function(_super) {
      __extends(TranslatedAddressItemView, _super);

      function TranslatedAddressItemView() {
        return TranslatedAddressItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedAddressItemView.prototype.template = translatedaddressviewTpl;

      TranslatedAddressItemView.prototype.serializeData = function() {
        var data;
        data = TranslatedAddressItemView.__super__.serializeData.call(this);
        data.translation_language = _.polyglot.t(data.translation_language);
        return data;
      };

      TranslatedAddressItemView.prototype.events = {
        "click #btn-update-translated-siteprofile": "updateSiteTranslation"
      };

      TranslatedAddressItemView.prototype.updateSiteTranslation = function(e) {
        var siteTranslation;
        e.preventDefault();
        siteTranslation = [];
        this.$el.find("input").each(function() {
          siteTranslation.push({
            translated_option: $(this).val(),
            translation_of_option: $(this).attr("data-siteoption")
          });
        });
        return this.trigger('update:translated:siteprofile', siteTranslation);
      };

      TranslatedAddressItemView.prototype.onSiteprofileUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t('Address translation updated successfully') + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return TranslatedAddressItemView;

    })(Marionette.ItemView);
  });
});
