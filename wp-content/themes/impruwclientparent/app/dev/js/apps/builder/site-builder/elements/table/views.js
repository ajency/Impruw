var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Table.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TableView = (function(_super) {
      __extends(TableView, _super);

      function TableView() {
        this.destroyEditor = __bind(this.destroyEditor, this);
        this.configureEditor = __bind(this.configureEditor, this);
        return TableView.__super__.constructor.apply(this, arguments);
      }

      TableView.prototype.className = 'imp-table';

      TableView.prototype.template = '<div class="table-settings-bar"> <div class="form-inline"> <div class="control-group"> <label for="spinner-01">Columns: </label> <div class="input-group spinner column-spinner"> <input type="text" class="form-control" value="{{column}}"> <div class="input-group-btn-vertical"> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button> </div> </div> </div> <div class="control-group"> <label for="spinner-02">Rows: </label> <div class="input-group spinner row-spinner"> <input type="text" class="form-control" value="{{row}}"> <div class="input-group-btn-vertical"> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button> </div> </div> </div> <div class="control-group"> <label for="style">Style: </label> <select id="style"> <option value="1">Style 1</option> <option value="2">Style 2</option> </select> </div> </div> </div> <div class="table-holder"></div>';

      TableView.prototype.ui = {
        editableData: 'table td ',
        editableHead: 'table th '
      };

      TableView.prototype.events = {
        'click @ui.editableData,@ui.editableHead': 'showEditor',
        'click .cke_editable': function(e) {
          return e.stopPropagation();
        },
        'click a': function(e) {
          return e.preventDefault();
        },
        'click .table-holder': 'destroyEditor',
        'click .spinner .btn:first-of-type': 'increaseCount',
        'click .spinner .btn:last-of-type': 'decreaseCount',
        'column:resize:stop.rc table': 'saveTableMarkup'
      };

      TableView.prototype.onShow = function() {
        this.$el.find('.table-holder').html(_.stripslashes(this.model.get('content')));
        this.$el.find('table').resizableColumns();
        return this.$el.find('select').selectpicker();
      };

      TableView.prototype.increaseCount = function(evt) {
        evt.stopPropagation();
        $(evt.target).closest('.spinner').find('input').val(parseInt($(evt.target).closest('.spinner').find('input').val(), 10) + 1);
        if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
          this.columnChanged(parseInt($(evt.target).closest('.spinner').find('input').val()));
        }
        if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
          return this.rowChanged(parseInt($(evt.target).closest('.spinner').find('input').val()));
        }
      };

      TableView.prototype.decreaseCount = function(evt) {
        evt.stopPropagation();
        $(evt.target).closest('.spinner').find('input').val(parseInt($(evt.target).closest('.spinner').find('input').val(), 10) - 1);
        if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
          this.columnChanged(parseInt($(evt.target).closest('.spinner').find('input').val()));
        }
        if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
          return this.rowChanged(parseInt($(evt.target).closest('.spinner').find('input').val()));
        }
      };

      TableView.prototype.rowChanged = function(row) {
        var html, index, _i, _ref;
        if (row > this.model.get('row')) {
          this.model.set('row', row);
          html = '<tr>';
          for (index = _i = 1, _ref = this.model.get('column'); 1 <= _ref ? _i <= _ref : _i >= _ref; index = 1 <= _ref ? ++_i : --_i) {
            html += '<td><div>demo</div></td>';
          }
          html += '</tr>';
          this.$el.find('tbody').append(html);
        } else {
          bootbox.confirm('Removing a ROW might cause a loss of data. Do you want to continue?', (function(_this) {
            return function(result) {
              if (result) {
                _this.model.set('row', row);
                return _this.$el.find('tbody tr:last-of-type').remove();
              } else {
                return _this.$el.find('.row-spinner input').val(_this.model.get('row'));
              }
            };
          })(this));
        }
        return this.saveTableMarkup();
      };

      TableView.prototype.columnChanged = function(column) {
        var tableRows;
        if (column > this.model.get('column')) {
          this.model.set('column', column);
          this.$el.find('thead tr').append('<th><div>demo</div></th>');
          tableRows = this.$el.find('tbody tr');
          _.each(tableRows, function(row, index) {
            return $(row).append('<td><div>demo</div></td>');
          });
          this.$el.find('table').resizableColumns('destroy');
          this.$el.find('table').resizableColumns();
        } else {
          bootbox.confirm('Removing a COLUMN might cause a loss of data. Do you want to continue?', (function(_this) {
            return function(result) {
              if (result) {
                _this.model.set('column', column);
                _this.$el.find('thead tr th:last-of-type').remove();
                return tableRows = _this.$el.find('tbody tr td:last-of-type').remove();
              } else {
                return _this.$el.find('.column-spinner input').val(_this.model.get('column'));
              }
            };
          })(this));
        }
        return this.saveTableMarkup();
      };

      TableView.prototype.showEditor = function(evt) {
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
        return this.editor = CKEDITOR.inline(document.getElementById(id));
      };

      TableView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            return editor.config.placeholder = 'Enter Data';
          });
        }
      };

      TableView.prototype.destroyEditor = function(evt) {
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

      TableView.prototype.saveTableMarkup = function() {
        console.log('save table');
        return this.trigger('save:table', this.$el.find('.table-holder'));
      };

      return TableView;

    })(Marionette.ItemView);
  });
});
