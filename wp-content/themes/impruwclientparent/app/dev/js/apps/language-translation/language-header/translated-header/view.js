var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-header/translated-header/templates/translatedheaderview.html'], function(App, translatedheaderviewTpl) {
  return App.module('LanguageApp.LanguageHeaderContent.TranslatedHeader.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedHeaderItemView;
    TranslatedHeaderItemView = (function(_super) {
      __extends(TranslatedHeaderItemView, _super);

      function TranslatedHeaderItemView() {
        return TranslatedHeaderItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedHeaderItemView.prototype.tagName = 'div';

      TranslatedHeaderItemView.prototype.className = 'form-group legend-group';

      TranslatedHeaderItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <p class="form-control translated-header-content {{TypeOfElementClass}}">{{contentText}}</p> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="save-translated-header-element"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedHeaderItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedHeaderItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      TranslatedHeaderItemView.prototype.events = {
        "click #save-translated-header-element": "updateHeaderElement"
      };

      TranslatedHeaderItemView.prototype.updateHeaderElement = function(e) {
        var newElementContent;
        e.preventDefault();
        newElementContent = this.$el.find('.translated-header-content').html();
        return this.trigger("header:element:updated", newElementContent);
      };

      TranslatedHeaderItemView.prototype.onShow = function() {
        var content_text, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        if (this.model.get('element') === "Title") {
          this.$el.find('.translated-header-content').attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        } else {
          this.$el.find('.translated-header-content').attr('contenteditable', 'true').attr('id', _.uniqueId('text-'));
        }
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.find('.translated-header-content').attr('id')));
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

      TranslatedHeaderItemView.prototype.onClose = function() {
        return this.editor.destroy(true);
      };

      return TranslatedHeaderItemView;

    })(Marionette.ItemView);
    return Views.TranslatedHeaderView = (function(_super) {
      __extends(TranslatedHeaderView, _super);

      function TranslatedHeaderView() {
        return TranslatedHeaderView.__super__.constructor.apply(this, arguments);
      }

      TranslatedHeaderView.prototype.template = translatedheaderviewTpl;

      TranslatedHeaderView.prototype.itemView = TranslatedHeaderItemView;

      TranslatedHeaderView.prototype.itemViewContainer = '#translated-header-elements';

      TranslatedHeaderView.prototype.serializeData = function() {
        var data;
        data = TranslatedHeaderView.__super__.serializeData.call(this);
        data.translation_language = _.polyglot.t(data.translation_language);
        return data;
      };

      TranslatedHeaderView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedHeaderView;

    })(Marionette.CompositeView);
  });
});
