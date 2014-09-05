var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedTableItemView;
    TranslatedTableItemView = (function(_super) {
      __extends(TranslatedTableItemView, _super);

      function TranslatedTableItemView() {
        this.configureEditor = __bind(this.configureEditor, this);
        return TranslatedTableItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTableItemView.prototype.tagName = 'div';

      TranslatedTableItemView.prototype.className = 'form-group legend-group';

      TranslatedTableItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field" id="translated-table-elements"> <div class="col-sm-10"> <div class="form-control translated-element-content {{element}}" tabindex="1" id="translated-table-content"> {{{contentText}}} </div> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-table"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedTableItemView.prototype.events = {
        "click #btn-save-translated-table": "updatePageTable",
        "click table td": "showEditor",
        "click table th": "showEditor"
      };

      TranslatedTableItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedTableItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        data.contentText = function() {
          var translated_text;
          if (_.isObject(data.content)) {
            if (data.content[editingLanguage] === void 0) {
              translated_text = data.content[WPML_DEFAULT_LANG];
            } else {
              translated_text = data.content[editingLanguage];
            }
          } else {
            translated_text = data.content;
          }
          console.log(translated_text);
          translated_text = _.stripslashes(translated_text);
          return translated_text;
        };
        return data;
      };

      TranslatedTableItemView.prototype.updatePageTable = function(e) {
        var newElementContent, newHtmlContent;
        e.preventDefault();
        newHtmlContent = $('#translated-table-content').clone();
        $(newHtmlContent).find('td div, th div').removeAllAttr();
        newElementContent = "" + ($(newHtmlContent).html());
        console.log(newElementContent);
        return this.trigger("page:table:updated", newElementContent);
      };

      TranslatedTableItemView.prototype.showEditor = function(evt) {
        var id;
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
        }
        console.log('showEditor');
        id = _.uniqueId('text-');
        $(evt.target).closest('td,th').find('div').attr('contenteditable', 'true').attr('id', id);
        CKEDITOR.on('instanceCreated', this.configureEditor);
        this.editor = CKEDITOR.inline(document.getElementById(id));
        return this.editor.config.placeholder = 'Click to enter text.';
      };

      TranslatedTableItemView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            return editor.config.placeholder = 'Enter Data';
          });
        }
      };

      TranslatedTableItemView.prototype.destroyEditor = function() {
        if (this.editor) {
          this.editor.destroy();
          this.editor = null;
          console.log('editor destroyed');
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
          this.$el.find('table').resizableColumns('destroy');
          return this.$el.find('table').resizableColumns();
        }
      };

      return TranslatedTableItemView;

    })(Marionette.ItemView);
    return Views.TranslatedTableView = (function(_super) {
      __extends(TranslatedTableView, _super);

      function TranslatedTableView() {
        return TranslatedTableView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTableView.prototype.template = '<div id="translatable-page-table"></div>';

      TranslatedTableView.prototype.itemView = TranslatedTableItemView;

      TranslatedTableView.prototype.itemViewContainer = '#translatable-page-table';

      TranslatedTableView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedTableView;

    })(Marionette.CompositeView);
  });
});
