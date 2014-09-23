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

      LanguageItemView.prototype.serializeData = function() {
        var data;
        data = LanguageItemView.__super__.serializeData.call(this);
        data.languageName = _.polyglot.t(data.languageName);
        return data;
      };

      LanguageItemView.prototype.mixinTemplateHelpers = function(data) {
        data = LanguageItemView.__super__.mixinTemplateHelpers.call(this, data);
        if ((data.code === 'en') || (data.code === WPML_DEFAULT_LANG)) {
          data.isDefaultLanguage = true;
        } else {
          data.isDefaultLanguage = false;
        }
        return data;
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
        'click #btn_update-enabled-languages': 'setEnabledLanguages',
        'click .cancel-more-langs': function(e) {
          return e.preventDefault();
        },
        "click div.js-enabled-languages ul.selectpicker li": "loadLanguagePageNav",
        "click div.single-language": "hideLanguages"
      };

      LanguageSelectionView.prototype.onShow = function() {
        var selectedLang;
        this.selectedLang = selectedLang = App.request("get:selected:languages");
        this.loadLanguageDropdown();
        return this.viewEnabledLanguages();
      };

      LanguageSelectionView.prototype.serializeData = function() {
        var data;
        data = LanguageSelectionView.__super__.serializeData.call(this);
        data.default_language = _.polyglot.t(data.default_language);
        return data;
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

      LanguageSelectionView.prototype.loadLanguagePageNav = function(e) {
        var selectedIndex, selectedLangVal;
        $('.aj-imp-widget-content').hide();
        selectedIndex = $(e.currentTarget).attr('rel');
        selectedLangVal = $('select#select_editing_language option:eq(' + selectedIndex + ')').attr('value');
        if (selectedLangVal !== "") {
          return this.trigger('load:language:page:nav', selectedLangVal);
        }
      };

      LanguageSelectionView.prototype.onSelectedLanguagesEnabled = function(collection) {
        var htmlString;
        htmlString = "";
        $('select.js-enabled-languages').empty();
        $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>");
        collection.each(function(m) {
          var languageCode, languageName;
          languageCode = m.get("code");
          languageName = _.polyglot.t(m.get("languageName"));
          if (languageCode !== WPML_DEFAULT_LANG) {
            $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>");
          }
          htmlString += '<div class="single-language" id="language-' + languageCode + '"> <span class="icon icon-checkmark"></span> ' + languageName + ' </div>';
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
          languageName = _.polyglot.t(m.get("languageName"));
          return htmlString += '<div class="single-language" id="language-' + languageCode + '" data-language-code="' + languageCode + '"> <span class="icon icon-checkmark"></span>' + languageName + ' </div>';
        });
        return this.$el.find(".selected-languages").html(htmlString);
      };

      LanguageSelectionView.prototype.hideLanguages = function(e) {
        var hideLanguageValue, language_code, showHideClass, single_language_element;
        console.log("Language hidden");
        console.log($(e.currentTarget).attr("data-language-code"));
        language_code = $(e.currentTarget).attr("data-language-code");
        single_language_element = '#language-' + language_code + ' span';
        console.log(single_language_element);
        if (this.$el.find(single_language_element).hasClass('icon-checkmark')) {
          this.$el.find(single_language_element).removeClass('icon-checkmark');
          showHideClass = 'icon-cancel';
          hideLanguageValue = 1;
        } else if (this.$el.find(single_language_element).hasClass('icon-cancel')) {
          this.$el.find(single_language_element).removeClass('icon-cancel');
          showHideClass = 'icon-checkmark';
          hideLanguageValue = 0;
        }
        this.trigger('update:hidden:languages', language_code, hideLanguageValue);
        return this.$el.find(single_language_element).addClass(showHideClass);
      };

      LanguageSelectionView.prototype.loadLanguageDropdown = function() {
        $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>");
        this.selectedLang.each(function(m) {
          var languageCode, languageName;
          languageCode = m.get("code");
          languageName = _.polyglot.t(m.get("languageName"));
          if (languageCode !== WPML_DEFAULT_LANG) {
            $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>");
          }
        });
        return this.$el.find('select').selectpicker();
      };

      return LanguageSelectionView;

    })(Marionette.CompositeView);
  });
});
