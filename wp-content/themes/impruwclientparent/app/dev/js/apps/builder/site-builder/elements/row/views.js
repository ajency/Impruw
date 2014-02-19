// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app'], function(App) {
    return App.module('SiteBuilderApp.Element.Row.Views', function(Views, App, Backbone, Marionette, $, _) {
      var _ref;
      return Views.RowView = (function(_super) {
        __extends(RowView, _super);

        function RowView() {
          this.adjustColumnsInRow = __bind(this.adjustColumnsInRow, this);
          _ref = RowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        RowView.prototype.className = 'row';

        RowView.prototype.template = '<div data-class="6" class="col-md-6 column empty-column"></div>\
						<div data-class="6" class="col-md-6 column empty-column"></div>';

        RowView.prototype.onRender = function() {
          return this.$el.children('.column').sortable({
            revert: 'invalid',
            items: '> .element-wrapper',
            connectWith: '.droppable-column,.column',
            handle: '.aj-imp-drag-handle',
            start: function(e, ui) {
              return ui.placeholder.height(ui.item.height());
            },
            helper: 'clone',
            opacity: .65,
            remove: function(evt, ui) {
              if ($(evt.target).children().length === 0) {
                return $(evt.target).addClass('empty-column');
              }
            },
            receive: function(e, ui) {
              return $(e.target).removeClass('empty-column');
            }
          });
        };

        RowView.prototype.onShow = function() {
          var _this = this;
          return _.delay(function() {
            return _this.setColumnResizer();
          }, 200);
        };

        RowView.prototype.onStyleChange = function(newStyle, old) {
          if (!_(old).isEmpty()) {
            this.$el.removeClass(old);
          }
          return this.$el.addClass(newStyle);
        };

        RowView.prototype.onColumnCountChanged = function(columnCount) {
          return this.adjustColumnsInRow(columnCount);
        };

        RowView.prototype.columnCount = function() {
          return this.$el.children('.column').length;
        };

        RowView.prototype.getColumns = function() {
          return this.$el.children('.column');
        };

        RowView.prototype.getResizers = function() {
          return this.$el.closest('.element-wrapper').find('.element-controls > .aj-imp-col-divider');
        };

        RowView.prototype.getColumnAt = function(index) {
          var columns;
          columns = this.$el.children('.column');
          return columns[index];
        };

        RowView.prototype.clearResizers = function() {
          var resizer, _i, _len, _ref1, _results;
          _ref1 = this.getResizers();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            resizer = _ref1[_i];
            $(resizer).draggable('destroy');
            _results.push($(resizer).remove());
          }
          return _results;
        };

        RowView.prototype.destroySortableColumns = function() {
          return this.$el.children('.column').sortable('destroy');
        };

        RowView.prototype.onClose = function() {
          this.clearResizers();
          return this.destroySortableColumns();
        };

        RowView.prototype.setColumnResizer = function() {
          var numberOfResizers, template,
            _this = this;
          this.clearResizers();
          if (this.columnCount() === 1) {
            return;
          }
          template = '<div class="aj-imp-col-divider">\
								<p title="Move">\
									<span class="bicon icon-uniF140"></span>\
								</p>\
							</div>';
          numberOfResizers = this.columnCount() - 1;
          return _.each(_.range(numberOfResizers), function(ele, index) {
            var column, left, resizer;
            column = _this.getColumnAt(index + 1);
            left = $(column).position().left;
            resizer = $(template);
            resizer.attr('data-position', index + 1);
            resizer.css('left', left);
            _this.$el.closest('.element-wrapper').children('.element-controls').append(resizer);
            return _this.makeResizer(resizer);
          });
        };

        RowView.prototype.makeResizer = function(resizer) {
          var row, snap,
            _this = this;
          row = resizer.parent();
          snap = row.width();
          snap = snap / 12;
          return resizer.draggable({
            axis: "x",
            containment: row,
            grid: [snap, 0],
            start: function(event, ui) {
              if (_.isUndefined(ui.helper.start)) {
                return ui.helper.start = ui.originalPosition;
              }
            },
            stop: function(event, ui) {
              return ui.helper.start = ui.position;
            },
            drag: function(event, ui) {
              var p, position, s;
              p = Math.round(ui.position.left);
              s = Math.round(ui.helper.start.left);
              if (p > s) {
                ui.helper.start = ui.position;
                position = $(event.target).attr("data-position");
                return _this.resizeColumns("right", parseInt(position));
              } else if (p < s) {
                ui.helper.start = ui.position;
                position = $(event.target).attr("data-position");
                return _this.resizeColumns("left", parseInt(position));
              }
            }
          });
        };

        RowView.prototype.resizeColumns = function(direction, position) {
          var columns, currentClassOne, currentClassZero;
          columns = [];
          columns.push(this.getColumnAt(position - 1));
          columns.push(this.getColumnAt(position));
          currentClassZero = parseInt($(columns[0]).attr('data-class'));
          currentClassOne = parseInt($(columns[1]).attr('data-class'));
          if (currentClassZero - 1 === 0 || currentClassOne - 1 === 0) {
            return;
          }
          $(columns[0]).removeClass("col-md-" + currentClassZero);
          $(columns[1]).removeClass("col-md-" + currentClassOne);
          switch (direction) {
            case "right":
              currentClassZero++;
              currentClassOne--;
              break;
            case "left":
              currentClassZero--;
              currentClassOne++;
          }
          $(columns[0]).attr('data-class', currentClassZero).addClass("col-md-" + currentClassZero);
          return $(columns[1]).attr('data-class', currentClassOne).addClass("col-md-" + currentClassOne);
        };

        RowView.prototype.addNewColumn = function(colClass) {
          var template;
          template = _.template('<div data-class="{{cclass}}" class="col-md-{{cclass}} column empty-column"></div>', {
            cclass: colClass
          });
          this.$el.append(template);
          return this.$el.children('.column').last().sortable();
        };

        RowView.prototype.removeColumn = function($column) {
          $column.sortable("destroy");
          return $column.remove();
        };

        RowView.prototype.adjustColumnsInRow = function(count) {
          var colClass, colsToRemove, emptyColsLen, emptyColumns, extraColumns, nCols, requestedColumns,
            _this = this;
          requestedColumns = count;
          if (requestedColumns === this.columnCount()) {
            return;
          }
          colClass = 12 / requestedColumns;
          if (requestedColumns > this.columnCount()) {
            extraColumns = requestedColumns - this.columnCount();
            _.each(this.getColumns(), function(column, index) {
              var currentClass;
              currentClass = $(column).attr('data-class');
              return $(column).removeClass("col-md-" + currentClass).addClass("col-md-" + colClass).attr('data-class', colClass);
            });
            _.each(_.range(extraColumns), function() {
              return _this.addNewColumn(colClass);
            });
          } else if (requestedColumns < this.columnCount()) {
            emptyColumns = [];
            _.each(this.getColumns(), function(column, index) {
              if ($(column).isEmptyColumn()) {
                return emptyColumns.push($(column));
              }
            });
            emptyColsLen = emptyColumns.length;
            if (emptyColsLen === 0) {
              alert("None of the columns are empty. Please delete elements inside columns to remove");
              return;
            }
            if (this.columnCount() - requestedColumns > emptyColsLen) {
              alert("Unable to perform this action");
              return;
            }
            colsToRemove = 0;
            if (this.columnCount() - requestedColumns <= emptyColsLen) {
              colsToRemove = this.columnCount() - requestedColumns;
            } else {
              colsToRemove = emptyColsLen - requestedColumns;
            }
            nCols = [];
            _.each(this.getColumns(), function(column, index) {
              if (colsToRemove === 0 || !$(column).isEmptyColumn()) {
                return;
              }
              _this.removeColumn($(column));
              return colsToRemove--;
            });
            _.each(this.getColumns(), function(column, index) {
              var currentClass;
              currentClass = $(column).attr('data-class');
              return $(column).removeClass("col-md-" + currentClass).addClass("col-md-" + colClass).attr('data-class', colClass);
            });
          }
          return this.setColumnResizer();
        };

        return RowView;

      })(Marionette.ItemView);
    });
  });

}).call(this);
