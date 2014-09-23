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

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this.view = this._getTableView();
        this.listenTo(this.view, "save:table", (function(_this) {
          return function(tableHolder) {
            var data, html, newdata, original_data;
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
            newdata = {};
            Object.getOwnPropertyNames(data).forEach(function(val, idx, array) {
              return newdata[val] = _.stripslashes(data[WPML_DEFAULT_LANG]);
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
