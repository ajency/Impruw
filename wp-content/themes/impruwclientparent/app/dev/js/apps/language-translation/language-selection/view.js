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
        'click .cancel-hide-more-langs': function(e) {
          return e.preventDefault();
        },
        "click div.js-enabled-languages ul.selectpicker li": "loadLanguagePageNav",
        "click #btn_update-hidden-languages": "hideLanguage"
      };

      LanguageSelectionView.prototype.onShow = function() {
        var selectedLang;
        this.selectedLang = selectedLang = App.request("get:selected:languages");
        this.loadLanguageDropdown();
        this.viewEnabledLanguages();
        this.viewHiddenLanguageList();
        return this.$el.find('input[type="checkbox"]').checkbox();
      };

      LanguageSelectionView.prototype.serializeData = function() {
        var data;
        data = LanguageSelectionView.__super__.serializeData.call(this);
        data.default_language = _.polyglot.t(data.default_language);
        return data;
      };

      LanguageSelectionView.prototype.viewHiddenLanguageList = function() {
        var html;
        html = '';
        this.selectedLang.each(function(m) {
          var checkedStatus, disabledStatus, hideClass, isLanguageDefault, isLanguageHidden, languageCode, languageName;
          languageCode = m.get("code");
          languageName = _.polyglot.t(m.get("languageName"));
          isLanguageDefault = m.get("isDefaultLanguage");
          isLanguageHidden = m.get("isHidden");
          if (isLanguageHidden) {
            checkedStatus = 'checked';
          } else {
            checkedStatus = '';
          }
          if ((languageCode === WPML_DEFAULT_LANG) || (languageCode === 'en')) {
            disabledStatus = 'disabled';
            hideClass = 'hide';
          } else {
            disabledStatus = '';
            hideClass = '';
          }
          return html += '<div class="form-group ' + hideClass + '"> <label for="checkbox2" class="checkbox"> <input type="checkbox" data-toggle="checkbox" value="' + languageCode + '" ' + checkedStatus + ' ' + disabledStatus + '>' + languageName + '</label> </div>';
        });
        return this.$el.find("#hide-langs").html(html);
      };

      LanguageSelectionView.prototype.hideLanguage = function(e) {
        var arr, hiddenlanguages;
        e.preventDefault();
        arr = this.$el.find("div#hide-langs input[type='checkbox']");
        hiddenlanguages = new Array();
        jQuery.each(arr, function() {
          if (this.checked) {
            hiddenlanguages.push(this.value);
          }
        });
        return this.trigger('update:hidden:language', hiddenlanguages);
      };

      LanguageSelectionView.prototype.onHiddenLanguages = function(msg, hiddenlanguages) {
        var currenLang, currentlanguages, i, isLangHidden, len, single_language_element;
        len = hiddenlanguages.length;
        currentlanguages = new Array();
        $("div.single-language").each(function() {
          var divLangCode;
          divLangCode = $(this).attr("data-language-code");
          return currentlanguages.push(divLangCode);
        });
        if (len === 0) {
          $("div.single-language").each(function() {
            var divLangCode, single_language_element;
            divLangCode = $(this).attr("data-language-code");
            single_language_element = '#language-' + divLangCode + ' span';
            $(single_language_element).removeClass();
            $(single_language_element).addClass('icon');
            return $(single_language_element).addClass('icon-checkmark');
          });
        } else {
          i = 0;
          while (i < currentlanguages.length) {
            currenLang = currentlanguages[i];
            single_language_element = '#language-' + currenLang + ' span';
            isLangHidden = $.inArray(currenLang, hiddenlanguages);
            if (isLangHidden !== -1) {
              $(single_language_element).removeClass();
              $(single_language_element).addClass('icon');
              $(single_language_element).addClass('icon-cancel');
            } else {
              $(single_language_element).removeClass();
              $(single_language_element).addClass('icon');
              $(single_language_element).addClass('icon-checkmark');
            }
            i++;
          }
        }
        this.$el.find('.error-msg span').remove();
        this.$el.find('.error-msg').append('<span class="help-block alert alert-success">' + msg + '</span>');
        return this.$el.find('.error-msg span').fadeOut(5000);
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
        var htmlString, htmlforHiddenLangView;
        htmlString = "";
        htmlforHiddenLangView = "";
        $('select.js-enabled-languages').empty();
        $("select.js-enabled-languages").append("<option value = ''>" + _.polyglot.t('Select a Language') + "</option>");
        collection.each(function(m) {
          var checkedStatus, disabledStatus, hideClass, isLanguageDefault, islanguageHidden, languageCode, languageName, spanClass;
          languageCode = m.get("code");
          islanguageHidden = m.get("isHidden");
          languageName = _.polyglot.t(m.get("languageName"));
          isLanguageDefault = m.get("isDefaultLanguage");
          if (languageCode !== WPML_DEFAULT_LANG) {
            $("select.js-enabled-languages").append("<option value = " + languageCode + ">" + languageName + "</option>");
          }
          if (islanguageHidden) {
            spanClass = 'icon-cancel';
            checkedStatus = 'checked';
          } else {
            spanClass = 'icon-checkmark';
            checkedStatus = '';
          }
          if ((languageCode === WPML_DEFAULT_LANG) || (languageCode === 'en')) {
            disabledStatus = 'disabled';
            hideClass = 'hide';
          } else {
            disabledStatus = '';
            hideClass = '';
          }
          htmlforHiddenLangView += '<div class="form-group ' + hideClass + '"> <label for="checkbox2" class="checkbox"> <input type="checkbox" data-toggle="checkbox" value="' + languageCode + '" ' + checkedStatus + ' ' + disabledStatus + '>' + languageName + '</label> </div>';
          htmlString += '<div class="single-language" id="language-' + languageCode + '" data-language-code="' + languageCode + '"> <span class="icon ' + spanClass + '"></span> ' + languageName + ' </div>';
        });
        this.$el.find(".selected-languages").html(htmlString);
        this.$el.find('select').selectpicker('refresh');
        this.$el.find("#hide-langs").html(htmlforHiddenLangView);
        this.$el.find('input[type="checkbox"]').checkbox();
        this.$el.find('.alert').remove();
        this.$el.prepend('<div class="alert alert-success">' + _.polyglot.t("Available languages updated") + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      LanguageSelectionView.prototype.viewEnabledLanguages = function() {
        var htmlString;
        htmlString = "";
        this.selectedLang.each(function(m) {
          var islanguageHidden, languageCode, languageName, spanClass;
          languageCode = m.get("code");
          islanguageHidden = m.get("isHidden");
          languageName = _.polyglot.t(m.get("languageName"));
          if (islanguageHidden) {
            spanClass = 'icon-cancel';
          } else {
            spanClass = 'icon-checkmark';
          }
          return htmlString += '<div class="single-language" id="language-' + languageCode + '" data-language-code="' + languageCode + '"> <span class="icon ' + spanClass + '"></span>' + languageName + ' </div>';
        });
        return this.$el.find(".selected-languages").html(htmlString);
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
