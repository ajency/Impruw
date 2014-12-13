var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/show/templates/languageview.html'], function(App, languageviewTpl) {
  return App.module('LanguageApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LanguageLayout = (function(_super) {
      __extends(LanguageLayout, _super);

      function LanguageLayout() {
        return LanguageLayout.__super__.constructor.apply(this, arguments);
      }

      LanguageLayout.prototype.template = languageviewTpl;

      LanguageLayout.prototype.regions = {
        languageSelectionRegion: "#pick-language",
        languagePageNav: "#js-page-nav",
        languagePageContent: "#js-other-tabs",
        languagePageRooms: "#js-rooms-tab",
        languageAddressContent: "#js-address-tab"
      };

      LanguageLayout.prototype.onShow = function() {
        var m, w;
        this.$el.find('select').selectpicker();
        this.$el.find('input[type="checkbox"]').radiocheck();
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      return LanguageLayout;

    })(Marionette.Layout);
  });
});
