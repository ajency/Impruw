var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-menus/translated-menu/templates/translatedmenuview.html'], function(App, translatedmenuviewTpl) {
  return App.module('LanguageApp.LanguageMenuContent.TranslatedMenu.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedMenuItemView;
    TranslatedMenuItemView = (function(_super) {
      __extends(TranslatedMenuItemView, _super);

      function TranslatedMenuItemView() {
        return TranslatedMenuItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedMenuItemView.prototype.tagName = 'div';

      TranslatedMenuItemView.prototype.className = 'form-group legend-group';

      TranslatedMenuItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <p class="form-control translated-header-content {{TypeOfElementClass}}">{{contentText}}</p> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="save-translated-header-element"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedMenuItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedMenuItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      TranslatedMenuItemView.prototype.events = {
        "click #save-translated-header-element": "updateMenuElement"
      };

      TranslatedMenuItemView.prototype.updateMenuElement = function(e) {
        var newElementContent;
        e.preventDefault();
        newElementContent = this.$el.find('.translated-header-content').html();
        return this.trigger("menu:element:updated", newElementContent);
      };

      TranslatedMenuItemView.prototype.onShow = function() {
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

      TranslatedMenuItemView.prototype.onClose = function() {
        return this.editor.destroy(true);
      };

      return TranslatedMenuItemView;

    })(Marionette.ItemView);
    return Views.TranslatedMenuView = (function(_super) {
      __extends(TranslatedMenuView, _super);

      function TranslatedMenuView() {
        return TranslatedMenuView.__super__.constructor.apply(this, arguments);
      }

      TranslatedMenuView.prototype.template = translatedmenuviewTpl;

      TranslatedMenuView.prototype.itemView = TranslatedMenuItemView;

      TranslatedMenuView.prototype.itemViewContainer = '#translated-menu-elements';

      TranslatedMenuView.prototype.serializeData = function() {
        var data;
        data = TranslatedMenuView.__super__.serializeData.call(this);
        data.translation_language = _.polyglot.t(data.translation_language);
        return data;
      };

      TranslatedMenuView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedMenuView;

    })(Marionette.CompositeView);
  });
});
