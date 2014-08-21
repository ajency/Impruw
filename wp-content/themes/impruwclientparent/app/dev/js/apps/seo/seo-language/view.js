var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SeoApp.SeoLanguage.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SeoLanguageView = (function(_super) {
      __extends(SeoLanguageView, _super);

      function SeoLanguageView() {
        return SeoLanguageView.__super__.constructor.apply(this, arguments);
      }

      SeoLanguageView.prototype.template = '<h6 class="aj-imp-sub-head-thin"> {{#polyglot}}Select Language{{/polyglot}} &nbsp; <select class="selectpicker js-seo-languages" id="select_seo_language"> </select> </h6> ';

      SeoLanguageView.prototype.events = {
        "click div.js-seo-languages ul.selectpicker li": "loadLanguagePageNav"
      };

      SeoLanguageView.prototype.onShow = function() {
        _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var html, language_code, language_name, language_select_status;
            language_select_status = model.get('selectStatus');
            language_code = model.get('code');
            language_name = model.get('languageName');
            if (language_select_status === true) {
              html = "<option value='" + language_code + "' >" + language_name + "</option>";
              return _this.$el.find('#select_seo_language').append(html);
            }
          };
        })(this));
        return this.$el.find('#select_seo_language').selectpicker();
      };

      SeoLanguageView.prototype.loadLanguagePageNav = function(e) {
        var langName, selectedLangVal;
        selectedLangVal = langName = this.$el.find('#select_seo_language').val();
        return this.trigger('load:seo:page:nav', selectedLangVal);
      };

      return SeoLanguageView;

    })(Marionette.ItemView);
  });
});
