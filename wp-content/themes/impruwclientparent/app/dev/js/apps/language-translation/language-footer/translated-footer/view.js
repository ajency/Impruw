var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-footer/translated-footer/templates/translatedfooterview.html'], function(App, translatedfooterviewTpl) {
  return App.module('LanguageApp.LanguageFooterContent.TranslatedFooter.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedFooterItemView;
    TranslatedFooterItemView = (function(_super) {
      __extends(TranslatedFooterItemView, _super);

      function TranslatedFooterItemView() {
        return TranslatedFooterItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedFooterItemView.prototype.tagName = 'div';

      TranslatedFooterItemView.prototype.className = 'form-group legend-group';

      TranslatedFooterItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <p class="form-control translated-footer-content {{TypeOfElementClass}}">{{contentText}}</p> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="save-translated-footer-element"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedFooterItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedFooterItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      TranslatedFooterItemView.prototype.events = {
        "click #save-translated-footer-element": "updateFooterElement"
      };

      TranslatedFooterItemView.prototype.updateFooterElement = function(e) {
        var newElementContent;
        e.preventDefault();
        newElementContent = this.$el.find('.translated-footer-content').html();
        return this.trigger("footer:element:updated", newElementContent);
      };

      TranslatedFooterItemView.prototype.onShow = function() {
        var content_text, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        if (this.model.get('element') === "Title") {
          this.$el.find('.translated-footer-content').attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        } else {
          this.$el.find('.translated-footer-content').attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        }
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.find('.translated-footer-content').attr('id')));
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

      TranslatedFooterItemView.prototype.onClose = function() {
        return this.editor.destroy(true);
      };

      return TranslatedFooterItemView;

    })(Marionette.ItemView);
    return Views.TranslatedFooterView = (function(_super) {
      __extends(TranslatedFooterView, _super);

      function TranslatedFooterView() {
        return TranslatedFooterView.__super__.constructor.apply(this, arguments);
      }

      TranslatedFooterView.prototype.template = translatedfooterviewTpl;

      TranslatedFooterView.prototype.itemView = TranslatedFooterItemView;

      TranslatedFooterView.prototype.itemViewContainer = '#translated-footer-elements';

      TranslatedFooterView.prototype.serializeData = function() {
        var data;
        data = TranslatedFooterView.__super__.serializeData.call(this);
        data.translation_language = _.polyglot.t(data.translation_language);
        return data;
      };

      TranslatedFooterView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedFooterView;

    })(Marionette.CompositeView);
  });
});
