var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TranslatedTableView = (function(_super) {
      __extends(TranslatedTableView, _super);

      function TranslatedTableView() {
        this.destroyEditor = __bind(this.destroyEditor, this);
        this.configureEditor = __bind(this.configureEditor, this);
        return TranslatedTableView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTableView.prototype.tagName = 'div';

      TranslatedTableView.prototype.className = 'form-group legend-group';

      TranslatedTableView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field" id="translated-table-elements"> </div> </div>';

      TranslatedTableView.prototype.onShow = function() {
        return _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var content, element, html, save_label;
            element = model.get('element');
            content = _.stripslashes(model.get('content'));
            save_label = _.polyglot.t('Save');
            html = '<div class="col-sm-10"> <div class="form-control translated-element-content ' + element + ' tabindex="1" id = "translated-table-content">' + content + '</div> <button class="btn btn-xs trans-action aj-imp-orange-btn"  id="btn-save-translated-table">' + save_label + '</button> </div>';
            return _this.$el.find('#translated-table-elements').append(html);
          };
        })(this));
      };

      TranslatedTableView.prototype.events = {
        "click #btn-save-translated-table": "updatePageTable",
        "click table td": "showEditor",
        "click table th": "showEditor"
      };

      TranslatedTableView.prototype.updatePageTable = function(e) {
        var newElementContent;
        e.preventDefault();
        newElementContent = this.$el.find('#translated-table-content').html();
        return console.log(newElementContent);
      };

      TranslatedTableView.prototype.showEditor = function(evt) {
        var id;
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
          this.saveTableMarkup();
        }
        console.log('showEditor');
        id = _.uniqueId('text-');
        $(evt.target).closest('td,th').find('div').attr('contenteditable', 'true').attr('id', id);
        CKEDITOR.on('instanceCreated', this.configureEditor);
        this.editor = CKEDITOR.inline(document.getElementById(id));
        return this.editor.config.placeholder = 'Click to enter text.';
      };

      TranslatedTableView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            return editor.config.placeholder = 'Enter Data';
          });
        }
      };

      TranslatedTableView.prototype.destroyEditor = function(evt) {
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
          this.editor = null;
          console.log('editor destroyed');
          this.$el.find('td div, th div').removeAttr('contenteditable').removeAttr('style').removeAttr('id');
          this.$el.find('table').resizableColumns('destroy');
          this.$el.find('table').resizableColumns();
          return this.saveTableMarkup();
        }
      };

      TranslatedTableView.prototype.saveTableMarkup = function() {
        console.log('save table');
        return this.trigger('save:table', this.$el.find('.table-holder'));
      };

      return TranslatedTableView;

    })(Marionette.ItemView);
  });
});
