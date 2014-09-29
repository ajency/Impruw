var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/table/templates/table.html', 'apps/builder/site-builder/elements/table/views', 'apps/builder/site-builder/elements/table/settings/controller'], function(App, tableTemplate, tableTemplateNb) {
  return App.module('SiteBuilderApp.Element.Table', function(Table, App, Backbone, Marionette, $, _) {
    return Table.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Table',
          content: {
            'en': tableTemplate,
            'nb': tableTemplate
          },
          row: 3,
          column: 3
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getTableView = function() {
        return new Table.Views.TableView({
          model: this.layout.model
        });
      };

      Controller.prototype.tableOnStyleChange = function(originalMarkup, referenceMarkup) {
        var $content, html_table, modified_language_table_html;
        if ($.trim(originalMarkup).length === 0) {
          originalMarkup = referenceMarkup;
        }
        html_table = '<div>' + originalMarkup + '</div>';
        $content = $(html_table);
        modified_language_table_html;
        if ($(referenceMarkup).find('table').hasClass('style-1')) {
          $content.find('table').addClass('style-1');
        } else {
          $content.find('table').removeClass('style-1');
        }
        if ($(referenceMarkup).find('table').hasClass('style-2')) {
          $content.find('table').addClass('style-2');
        } else {
          $content.find('table').removeClass('style-2');
        }
        if ($(referenceMarkup).find('table').hasClass('table-striped')) {
          $content.find('table').addClass('table-striped');
        } else {
          $content.find('table').removeClass('table-striped');
        }
        if ($(referenceMarkup).find('table').hasClass('table-bordered')) {
          $content.find('table').addClass('table-bordered');
        } else {
          $content.find('table').removeClass('table-bordered');
        }
        modified_language_table_html = $content.html();
        return modified_language_table_html;
      };

      Controller.prototype.tableOnColumnChange = function(originalMarkup, referenceMarkup) {
        var $content, currentColumnCount, currentRowCount, html_table, modified_language_table_html, referenceColumnCount, referenceTableHead, tableHeadColumns, tableRows, thWidthArray;
        if ($.trim(originalMarkup).length === 0) {
          originalMarkup = referenceMarkup;
        }
        referenceColumnCount = $(referenceMarkup).find('thead th').length;
        currentColumnCount = $(originalMarkup).find('thead th').length;
        currentRowCount = $(originalMarkup).find('tbody tr').length;
        html_table = '<div>' + originalMarkup + '</div>';
        $content = $(html_table);
        modified_language_table_html = '';
        if (currentColumnCount === referenceColumnCount) {
          modified_language_table_html = originalMarkup;
        } else if (currentColumnCount < referenceColumnCount) {
          while (currentColumnCount < referenceColumnCount) {
            $content.find('thead tr').append('<th><div>demo</div></th>');
            tableRows = $content.find('tbody tr');
            _.each(tableRows, function(row, index) {
              return $(row).append('<td><div>demo</div></td>');
            });
            referenceTableHead = $(referenceMarkup).find('thead th');
            thWidthArray = new Array();
            _.each(referenceTableHead, function(column, index) {
              var thwidth;
              thwidth = $(column).css('width');
              return thWidthArray.push(thwidth);
            });
            tableHeadColumns = $content.find('thead th');
            _.each(tableHeadColumns, function(column, index) {
              return $(column).css('width', thWidthArray[index]);
            });
            modified_language_table_html = $content.html();
            currentColumnCount++;
          }
        } else {
          while (currentColumnCount > referenceColumnCount) {
            $content.find('thead tr th:last-of-type').remove();
            tableRows = $content.find('tbody tr td:last-of-type').remove();
            referenceTableHead = $(referenceMarkup).find('thead th');
            thWidthArray = new Array();
            _.each(referenceTableHead, function(column, index) {
              var thwidth;
              thwidth = $(column).css('width');
              return thWidthArray.push(thwidth);
            });
            tableHeadColumns = $content.find('thead th');
            _.each(tableHeadColumns, function(column, index) {
              return $(column).css('width', thWidthArray[index]);
            });
            modified_language_table_html = $content.html();
            currentColumnCount--;
          }
        }
        return modified_language_table_html;
      };

      Controller.prototype.tableOnRowChange = function(originalMarkup, referenceMarkup) {
        var $content, $rowHtml, currentColumnCount, currentRowCount, html, html_table, index, modified_language_table_html, referenceRowCount, _i;
        if ($.trim(originalMarkup).length === 0) {
          originalMarkup = referenceMarkup;
        }
        referenceRowCount = $(referenceMarkup).find('tbody tr').length;
        currentRowCount = $(originalMarkup).find('tbody tr').length;
        currentColumnCount = $(originalMarkup).find('thead th').length;
        html_table = '<div>' + originalMarkup + '</div>';
        $content = $(html_table);
        modified_language_table_html = '';
        if (currentRowCount === referenceRowCount) {
          modified_language_table_html = originalMarkup;
        } else if (currentRowCount < referenceRowCount) {
          while (currentRowCount < referenceRowCount) {
            html = '<tr>';
            for (index = _i = 1; 1 <= currentColumnCount ? _i <= currentColumnCount : _i >= currentColumnCount; index = 1 <= currentColumnCount ? ++_i : --_i) {
              html += '<td><div>demo</div></td>';
            }
            html += '</tr>';
            $rowHtml = $(html);
            $content.find("tbody").append($rowHtml);
            modified_language_table_html = $content.html();
            currentRowCount++;
          }
        } else {
          while (currentRowCount > referenceRowCount) {
            $content.find('tbody tr:last-of-type').remove();
            modified_language_table_html = $content.html();
            currentRowCount--;
          }
        }
        return modified_language_table_html;
      };

      Controller.prototype._getTranslatedHtml = function(originalMarkup, referenceMarkup) {
        var finalTranslatedMarkup, modifiedTranslatedMarkup;
        originalMarkup = _.stripslashes(originalMarkup);
        referenceMarkup = _.stripslashes(referenceMarkup);
        modifiedTranslatedMarkup = this.tableOnRowChange(originalMarkup, referenceMarkup);
        modifiedTranslatedMarkup = this.tableOnColumnChange(modifiedTranslatedMarkup, referenceMarkup);
        modifiedTranslatedMarkup = this.tableOnStyleChange(modifiedTranslatedMarkup, referenceMarkup);
        finalTranslatedMarkup = modifiedTranslatedMarkup;
        return finalTranslatedMarkup;
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this.view = this._getTableView();
        this.listenTo(this.view, "save:table", (function(_this) {
          return function(tableHolder) {
            var allLanguages, data, html, i, languageCode, languageLen, newdata, original_data, translatedTableHtml;
            html = $(tableHolder).clone();
            $(html).find('.rc-handle-container').remove();
            $(html).find('.ui-resizable-handle').remove();
            $(html).find('td div, th div').removeAllAttr();
            original_data = _this.layout.model.get('content');
            if (_.isObject(original_data)) {
              data = original_data;
            } else {
              data = {};
              data['en'] = original_data;
            }
            data[WPML_DEFAULT_LANG] = $(html).html();
            languageLen = LANGUAGES.length;
            i = 0;
            while (i < languageLen) {
              allLanguages = LANGUAGES[i];
              languageCode = allLanguages.code;
              if (data.hasOwnProperty(languageCode)) {
                translatedTableHtml = _this._getTranslatedHtml(data[languageCode], data[WPML_DEFAULT_LANG]);
              } else {
                translatedTableHtml = data[WPML_DEFAULT_LANG];
              }
              data[languageCode] = _.stripslashes(translatedTableHtml);
              i++;
            }
            newdata = {};
            Object.getOwnPropertyNames(data).forEach(function(val, idx, array) {
              return newdata[val] = _.stripslashes(data[val]);
            });
            _this.layout.model.set('content', newdata);
            return _this.layout.model.save();
          };
        })(this));
        return this.layout.elementRegion.show(this.view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
