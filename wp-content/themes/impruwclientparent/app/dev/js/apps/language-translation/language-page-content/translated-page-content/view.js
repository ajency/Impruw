var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-page-content/translated-page-content/templates/translatedpageview.html'], function(App, translatedpageviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedPage.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedPageItemView;
    TranslatedPageItemView = (function(_super) {
      __extends(TranslatedPageItemView, _super);

      function TranslatedPageItemView() {
        return TranslatedPageItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPageItemView.prototype.tagName = 'div';

      TranslatedPageItemView.prototype.className = 'form-group legend-group';

      TranslatedPageItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <p class="form-control translated-element-content {{TypeOfElementClass}}">{{contentText}}</p> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-element"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedPageItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedPageItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        data.contentText = function() {
          var translated_text;
          if (data.element === "Link") {
            translated_text = data.text[editingLanguage];
            return translated_text;
          } else {
            translated_text = data.content[editingLanguage];
            return translated_text;
          }
        };
        data.TypeOfElementClass = function() {
          if ((data.element === "Title") || (data.element === "Link")) {
            return "title";
          } else {
            return "text";
          }
        };
        return data;
      };

      TranslatedPageItemView.prototype.events = {
        "click #btn-save-translated-element": "updatePageElement"
      };

      TranslatedPageItemView.prototype.updatePageElement = function(e) {
        var newElementContent;
        e.preventDefault();
        newElementContent = this.$el.find('.translated-element-content').html();
        console.log(newElementContent);
        return this.trigger("page:element:updated", newElementContent);
      };

      TranslatedPageItemView.prototype.onShow = function() {
        var content_text, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        if (this.model.get('element') === "Title") {
          this.$el.find('.translated-element-content').attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        } else {
          this.$el.find('.translated-element-content').attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        }
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.find('.translated-element-content').attr('id')));
        if (this.model.get('element') === 'Link') {
          content_text = 'text';
        } else {
          content_text = 'content';
        }
        if (this.model.get(content_text)[editingLanguage] === void 0) {
          return this.editor.setData("");
        } else {
          return this.editor.setData(_.stripslashes(this.model.get(content_text)[editingLanguage]));
        }
      };

      TranslatedPageItemView.prototype.onClose = function() {
        return this.editor.destroy(true);
      };

      return TranslatedPageItemView;

    })(Marionette.ItemView);
    return Views.TranslatedPageView = (function(_super) {
      __extends(TranslatedPageView, _super);

      function TranslatedPageView() {
        return TranslatedPageView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPageView.prototype.template = translatedpageviewTpl;

      TranslatedPageView.prototype.itemView = TranslatedPageItemView;

      TranslatedPageView.prototype.itemViewContainer = '#translated-page-elements';

      TranslatedPageView.prototype.events = {
        "click #btn-save-translated-page-title": "updatePageTitle"
      };

      TranslatedPageView.prototype.serializeData = function() {
        var data;
        data = TranslatedPageView.__super__.serializeData.call(this);
        data.language = _.polyglot.t(data.language);
        return data;
      };

      TranslatedPageView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      TranslatedPageView.prototype.updatePageTitle = function(e) {
        var newPageTitle, pageId;
        e.preventDefault();
        newPageTitle = this.$el.find('#translated-page-title').val();
        pageId = this.$el.find('#translated-page-id').val();
        return this.trigger("translated:page:title:updated", newPageTitle, pageId);
      };

      return TranslatedPageView;

    })(Marionette.CompositeView);
  });
});
