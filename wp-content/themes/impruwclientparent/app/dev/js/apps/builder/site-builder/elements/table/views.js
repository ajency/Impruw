var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Table.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TableView = (function(_super) {
      __extends(TableView, _super);

      function TableView() {
        this.destroyEditor = __bind(this.destroyEditor, this);
        return TableView.__super__.constructor.apply(this, arguments);
      }

      TableView.prototype.className = 'imp-table';

      TableView.prototype.template = '<div class="table-settings-bar"> <div class="form-inline"> <div class="control-group"> <label for="spinner-01">Columns: </label> <div class="input-group spinner column-spinner"> <input type="text" class="form-control" value="{{column}}"> <div class="input-group-btn-vertical"> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button> </div> </div> </div> <div class="control-group"> <label for="spinner-02">Rows: </label> <div class="input-group spinner row-spinner"> <input type="text" class="form-control" value="{{row}}"> <div class="input-group-btn-vertical"> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-up"></i></button> <button class="btn btn-default"><i class="glyphicon glyphicon-chevron-down"></i></button> </div> </div> </div> <div class="control-group"> <label for="style">Style: </label> <select id="style"> <option value="1">Style 1</option> <option value="2">Style 2</option> </select> </div> </div> </div> <div class="table-holder"></div>';

      TableView.prototype.ui = {
        editableData: 'table td div',
        editableHead: 'table th div'
      };

      TableView.prototype.events = {
        'dblclick @ui.editableData,@ui.editableHead': 'showEditor',
        'click .cke_editable': function(e) {
          return e.stopPropagation();
        },
        'click .table-holder': 'destroyEditor',
        'click .spinner .btn:first-of-type': 'increaseCount',
        'click .spinner .btn:last-of-type': 'decreaseCount'
      };

      TableView.prototype.modelEvents = {
        'change:row': 'rowChanged',
        'change:column': 'columnChanged'
      };

      TableView.prototype.onShow = function() {
        this.$el.find('.table-holder').html(_.stripslashes(this.model.get('content')));
        this.$el.find('table').resizableColumns();
        return $('select').selectpicker();
      };

      TableView.prototype.increaseCount = function(evt) {
        evt.stopPropagation();
        $(evt.target).closest('.spinner').find('input').val(parseInt($(evt.target).closest('.spinner').find('input').val(), 10) + 1);
        if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
          this.model.set('column', $(evt.target).closest('.spinner').find('input').val());
        }
        if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
          return this.model.set('row', $(evt.target).closest('.spinner').find('input').val());
        }
      };

      TableView.prototype.decreaseCount = function(evt) {
        evt.stopPropagation();
        $(evt.target).closest('.spinner').find('input').val(parseInt($(evt.target).closest('.spinner').find('input').val(), 10) - 1);
        if ($(evt.target).closest('.spinner').hasClass('column-spinner')) {
          this.model.set('column', $(evt.target).closest('.spinner').find('input').val());
        }
        if ($(evt.target).closest('.spinner').hasClass('row-spinner')) {
          return this.model.set('row', $(evt.target).closest('.spinner').find('input').val());
        }
      };

      TableView.prototype.rowChanged = function(model, row) {
        var html, ind, _i, _ref;
        if (row > model.previous('row')) {
          html = '<tr>';
          for (ind = _i = 1, _ref = model.get('column'); 1 <= _ref ? _i <= _ref : _i >= _ref; ind = 1 <= _ref ? ++_i : --_i) {
            html += '<td><div>demo</div></td>';
          }
          html += '</tr>';
          return this.$el.find('tbody').append(html);
        } else {

        }
      };

      TableView.prototype.columnChanged = function(model, column) {
        var tableRows;
        if (column > model.previous('column')) {
          this.$el.find('thead tr').append('<th><div>demo</div></th>');
          tableRows = this.$el.find('tbody tr');
          _.each(tableRows, function(row, index) {
            return $(row).append('<td><div>demo</div></td>');
          });
          return this.$el.find('table').resizableColumns();
        } else {

        }
      };

      TableView.prototype.showEditor = function(evt) {
        var id;
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
        }
        console.log('showEditor');
        id = _.uniqueId('text-');
        $(evt.target).closest('div').attr('contenteditable', 'true').attr('id', id);
        return this.editor = CKEDITOR.inline(document.getElementById(id));
      };

      TableView.prototype.destroyEditor = function(evt) {
        evt.stopPropagation();
        if (this.editor) {
          this.editor.destroy();
          console.log('editor destroyed');
          this.$el.find('td div, th div').attr('contenteditable', 'false').removeAttr('id');
        }
        return this.$el.find('table').resizableColumns();
      };

      return TableView;

    })(Marionette.ItemView);
  });
});
