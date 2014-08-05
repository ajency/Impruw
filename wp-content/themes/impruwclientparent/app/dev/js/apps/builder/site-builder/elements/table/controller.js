var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/table/views', 'apps/builder/site-builder/elements/table/settings/controller'], function(App) {
  App.module('SiteBuilderApp.Element.Table', function(Table, App, Backbone, Marionette, $, _) {
    return Table.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Table',
          content: {
            header: ['header1', 'header1', 'header1'],
            data: [['a', 'b', 'c', 'd'], ['1', '2', '3', '4']]
          }
        });
        Controller.__super__.initialize.call(this, options);
        ({
          bindEvents: function() {
            return Controller.__super__.initialize.call(this);
          },
          _getTableView: function() {
            return new Table.Views.TableView({
              model: this.layout.model,
              collection: this.rowCollection
            });
          },
          renderElement: (function(_this) {
            return function() {
              return _this.removeSpinner();
            };
          })(this)
        });
        this.rowCollection = new Backbone.Collection;
        this.rowCollection.set(this.layout.model.get('content')['data']);
        console.log(this.rowCollection);
        return this.view = this._getTableView();
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
  return this.layout.elementRegion.show(this.view);
});
