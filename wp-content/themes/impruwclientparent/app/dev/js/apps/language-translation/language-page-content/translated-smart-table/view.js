var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedSmartTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedSmartTableItemView;
    TranslatedSmartTableItemView = (function(_super) {
      __extends(TranslatedSmartTableItemView, _super);

      function TranslatedSmartTableItemView() {
        this.configureEditor = __bind(this.configureEditor, this);
        return TranslatedSmartTableItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSmartTableItemView.prototype.tagName = 'div';

      TranslatedSmartTableItemView.prototype.className = 'form-group legend-group';

      TranslatedSmartTableItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field" id="translated-smart-table-elements"> <div class="col-sm-10"> <div class="form-control translated-element-content {{element}}" tabindex="1" id="translated-smart-table-content"> {{{contentText}}} </div> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-smart-table"> {{#polyglot}}Save{{/polyglot}} </button> </div> </div> </div>';

      TranslatedSmartTableItemView.prototype.events = {
        "click #btn-save-translated-smart-table": "updatePageSmartTable",
        "click table td": "showEditor",
        "click table th": "showEditor",
        'click .cke_editable': function(e) {
          return e.stopPropagation();
        },
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      TranslatedSmartTableItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedSmartTableItemView.__super__.mixinTemplateHelpers.call(this, data);
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
          translated_text = _.stripslashes(translated_text);
          return translated_text;
        };
        return data;
      };

      TranslatedSmartTableItemView.prototype.updatePageSmartTable = function(e) {
        var newElementContent, newHtmlContent;
        e.preventDefault();
        newHtmlContent = $('#translated-table-content').clone();
        $(newHtmlContent).find('td div, th div').removeAllAttr();
        return newElementContent = "" + ($(newHtmlContent).html());
      };

      TranslatedSmartTableItemView.prototype.showEditor = function(evt) {
        var id;
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
        }
        id = _.uniqueId('text-');
        $(evt.target).closest('td,th').find('div').attr('contenteditable', 'true').attr('id', id);
        CKEDITOR.on('instanceCreated', this.configureEditor);
        this.editor = CKEDITOR.inline(document.getElementById(id));
        return this.editor.config.placeholder = 'Click to enter text.';
      };

      TranslatedSmartTableItemView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            return editor.config.placeholder = 'Enter Data';
          });
        }
      };

      TranslatedSmartTableItemView.prototype.destroyEditor = function() {
        if (this.editor) {
          this.editor.destroy();
          this.editor = null;
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
          this.$el.find('table').resizableColumns('destroy');
          return this.$el.find('table').resizableColumns();
        }
      };

      return TranslatedSmartTableItemView;

    })(Marionette.ItemView);
    return Views.TranslatedSmartTableView = (function(_super) {
      __extends(TranslatedSmartTableView, _super);

      function TranslatedSmartTableView() {
        return TranslatedSmartTableView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSmartTableView.prototype.template = '<div id="translatable-page-smart-table"></div>';

      TranslatedSmartTableView.prototype.itemView = TranslatedSmartTableItemView;

      TranslatedSmartTableView.prototype.itemViewContainer = '#translatable-page-smart-table';

      TranslatedSmartTableView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedSmartTableView;

    })(Marionette.CompositeView);
  });
});
