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

      TableView.prototype.template = '<div class="table-holder"></div>';

      TableView.prototype.ui = {
        editableData: 'table td ',
        editableHead: 'table th '
      };

      TableView.prototype.events = {
        'click @ui.editableData,@ui.editableHead': 'showEditor',
        'click .cke_editable': function(e) {
          return e.stopPropagation();
        },
        'blur .cke_editable': 'saveTableMarkup',
        'click a': function(e) {
          return e.preventDefault();
        },
        'click .table-holder': 'destroyEditor',
        'column:resize:stop.rc table': 'saveTableMarkup'
      };

      TableView.prototype.modelEvents = {
        'change:row': 'rowChanged',
        'change:column': 'columnChanged',
        'change:bordered': 'changeBordered',
        'change:striped': 'changeStriped',
        'change:style': 'changeStyle'
      };

      TableView.prototype.onShow = function() {
        var tablecontent, _ref;
        tablecontent = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        this.$el.find('.table-holder').html(_.stripslashes(tablecontent));
        this.$el.find('table').resizableColumns();
        this.$el.parent().css('padding-bottom', '7px');
        this.$el.find('.table-responsive').height(this.$el.find('.table-responsive').height());
        this.$el.find('.table-holder').height(this.$el.find('.table-responsive').height() + 15);
        return this.setResizable();
      };

      TableView.prototype.setResizable = function() {
        return this.$el.find('.table-holder').resizable({
          handles: 's',
          minHeight: 150,
          resize: (function(_this) {
            return function(event, ui) {
              return _this.$el.find('.table-responsive').height(ui.size.height - 15);
            };
          })(this),
          start: (function(_this) {
            return function(event, ui) {
              return _this.$el.find('.table-holder').resizable("option", "maxHeight", _this.$el.find('table').height() + 17);
            };
          })(this),
          stop: (function(_this) {
            return function(event, ui) {
              return _this.saveTableMarkup();
            };
          })(this)
        });
      };

      TableView.prototype.rowChanged = function(model, rows) {
        var currentRows, html, index, _i, _ref;
        console.log(rows);
        currentRows = this.$el.find('tbody tr').length;
        if (rows > 100 && currentRows < rows) {
          bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Cannot enter more then 100 rows') + "</h4>");
          return;
        }
        if (currentRows === rows) {

        } else if (currentRows < rows) {
          while (currentRows !== rows) {
            html = '<tr>';
            for (index = _i = 1, _ref = model.get('column'); 1 <= _ref ? _i <= _ref : _i >= _ref; index = 1 <= _ref ? ++_i : --_i) {
              html += '<td><div>demo</div></td>';
            }
            html += '</tr>';
            this.$el.find('tbody').append(html);
            currentRows++;
          }
          return this.saveTableMarkup();
        } else {
          return bootbox.confirm("<h4 class='delete-message'>" + _.polyglot.t('Removing a ROW might cause a loss of data. Do you want to continue?') + "</h4>", (function(_this) {
            return function(result) {
              if (result) {
                while (currentRows !== rows) {
                  _this.$el.find('tbody tr:last-of-type').remove();
                  currentRows--;
                }
                if (_this.$el.find('table').height() < _this.$el.find('.table-responsive').height()) {
                  _this.$el.find('.table-responsive').height(_this.$el.find('table').height() + 2);
                  _this.$el.find('.table-holder').height(_this.$el.find('.table-responsive').height() + 15);
                }
                _this.$el.find('.table-responsive').height(_this.$el.find('.table-responsive').height());
                return _this.saveTableMarkup();
              } else {
                return model.set('row', currentRows);
              }
            };
          })(this));
        }
      };

      TableView.prototype.columnChanged = function(model, columns) {
        var currentColumns, tableRows;
        console.log(columns);
        currentColumns = this.$el.find('thead th').length;
        if (columns > 100 && currentColumns < columns) {
          bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Cannot enter more then 100 columns') + "</h4>");
          return;
        }
        if (currentColumns === columns) {

        } else if (currentColumns < columns) {
          while (currentColumns !== columns) {
            this.$el.find('thead tr').append('<th><div>demo</div></th>');
            tableRows = this.$el.find('tbody tr');
            _.each(tableRows, function(row, index) {
              return $(row).append('<td><div>demo</div></td>');
            });
            currentColumns++;
          }
          this.$el.find('table').resizableColumns('destroy');
          this.$el.find('table').resizableColumns();
          return this.saveTableMarkup();
        } else {
          return bootbox.confirm("<h4 class='delete-message'>" + _.polyglot.t('Removing a COLUMN might cause a loss of data. Do you want to continue?') + "</h4>", (function(_this) {
            return function(result) {
              if (result) {
                while (currentColumns !== columns) {
                  _this.$el.find('thead tr th:last-of-type').remove();
                  tableRows = _this.$el.find('tbody tr td:last-of-type').remove();
                  currentColumns--;
                }
                _this.$el.find('table').resizableColumns('destroy');
                _this.$el.find('table').resizableColumns();
                return _this.saveTableMarkup();
              } else {
                return model.set('column', currentColumns);
              }
            };
          })(this));
        }
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
        this.editor = CKEDITOR.inline(document.getElementById(id));
        this.editor.config.placeholder = 'Click to enter text.';
        $(evt.target).closest('td,th').find('div').trigger('blur');
        return _.delay((function(_this) {
          return function() {
            return $(evt.target).closest('td,th').find('div').trigger('focus');
          };
        })(this), 200);
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

      TableView.prototype.changeBordered = function(model, bordered) {
        if (bordered) {
          this.$el.find('table').addClass('table-bordered');
        } else {
          this.$el.find('table').removeClass('table-bordered');
        }
        return this.saveTableMarkup();
      };

      TableView.prototype.changeStriped = function(model, striped) {
        if (striped) {
          this.$el.find('table').addClass('table-striped');
        } else {
          this.$el.find('table').removeClass('table-striped');
        }
        return this.saveTableMarkup();
      };

      TableView.prototype.changeStyle = function(model, style) {
        this.$el.find('table').removeClass('style-1 style-2').addClass(style);
        return this.saveTableMarkup();
      };

      TableView.prototype.onClose = function() {
        return this.$el.find('table').resizableColumns('destroy');
      };

      return TableView;

    })(Marionette.ItemView);
  });
});
