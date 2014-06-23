var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/language-translation/language-selection/templates/languageselectionview.html'], function(App, languageselectionviewTpl) {
  return App.module('LanguageApp.LanguageSelection.Views', function(Views, App, Backbone, Marionette, $, _) {
    var LanguageItemView;
    LanguageItemView = (function(_super) {
      __extends(LanguageItemView, _super);

      function LanguageItemView() {
        return LanguageItemView.__super__.constructor.apply(this, arguments);
      }

      LanguageItemView.prototype.tagName = "li";

      LanguageItemView.prototype.template = '<div class="form-group"> <label for="checkbox2" class="checkbox {{#isDefaultLanguage}}disabled checked{{/isDefaultLanguage}} "> <input type="checkbox" data-toggle="checkbox" {{#selectStatus}}checked{{/selectStatus}} value="{{code}}" {{#isDefaultLanguage}}disabled{{/isDefaultLanguage}}>{{languageName}} </label> </div> ';

      LanguageItemView.prototype.events = {
        "change input[type='checkbox']": "saveLanguage"
      };

      LanguageItemView.prototype.onShow = function() {
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      LanguageItemView.prototype.saveLanguage = function(evt) {
        return this.trigger("language:updated", $(evt.target));
      };

      return LanguageItemView;

    })(Marionette.ItemView);
    return Views.LanguageSelectionView = (function(_super) {
      __extends(LanguageSelectionView, _super);

      function LanguageSelectionView() {
        return LanguageSelectionView.__super__.constructor.apply(this, arguments);
      }

      LanguageSelectionView.prototype.template = languageselectionviewTpl;

      LanguageSelectionView.prototype.itemView = LanguageItemView;

      LanguageSelectionView.prototype.itemViewContainer = '.languages.clearfix';

      LanguageSelectionView.prototype.events = {
        'click #btn_update-enabled-languages': 'setEnabledLanguages'
      };

      LanguageSelectionView.prototype.onShow = function() {
        var selectedLang;
        this.selectedLang = selectedLang = App.request("get:selected:languages");
        this.loadLanguageDropdown();
        return this.viewEnabledLanguages();
      };

      LanguageSelectionView.prototype.setEnabledLanguages = function(e) {
        var arr, selectedlanguage;
        e.preventDefault();
        arr = this.$el.find("ul.languages input[type='checkbox']");
        selectedlanguage = new Array();
        jQuery.each(arr, function() {
          if (this.checked) {
            selectedlanguage.push(this.value);
          }
        });
        selectedlanguage = selectedlanguage.join(",");
        return this.trigger('update:enabled:languages', selectedlanguage);
      };

      LanguageSelectionView.prototype.onSelectedLanguagesEnabled = function(collection) {
        var htmlString;
        htmlString = "";
        $('select.js-enabled-languages').empty();
        collection.each(function(m) {
          var languageCode, languageName;
          languageCode = m.get("code");
          languageName = m.get("languageName");
          $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>");
          htmlString += '<div class="single-language"> <span class="icon icon-checkmark"></span> ' + languageName + ' </div>';
        });
        this.$el.find(".selected-languages").html(htmlString);
        this.$el.find('select').selectpicker('refresh');
        this.$el.find('.alert').remove();
        return this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("Available languages updated") + '</div>');
      };

      LanguageSelectionView.prototype.viewEnabledLanguages = function() {
        var htmlString;
        htmlString = "";
        this.selectedLang.each(function(m) {
          var languageCode, languageName;
          languageCode = m.get("code");
          languageName = m.get("languageName");
          return htmlString += '<div class="single-language"> <span class="icon icon-checkmark"></span> ' + languageName + ' </div>';
        });
        return this.$el.find(".selected-languages").html(htmlString);
      };

      LanguageSelectionView.prototype.loadLanguageDropdown = function() {
        this.selectedLang.each(function(m) {
          var languageCode, languageName;
          languageCode = m.get("code");
          languageName = m.get("languageName");
          $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>");
        });
        return this.$el.find('select').selectpicker();
      };

      return LanguageSelectionView;

    })(Marionette.CompositeView);
  });
});
