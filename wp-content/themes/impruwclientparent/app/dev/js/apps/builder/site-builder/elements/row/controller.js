var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox', 'apps/builder/site-builder/elements/row/views', 'apps/builder/site-builder/elements/row/settings/controller'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Row', function(Row, App, Backbone, Marionette, $, _) {
    return Row.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.elementMoved = __bind(this.elementMoved, this);
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        this.isNew = _.isEmpty(options.modelData);
        _.defaults(options.modelData, {
          element: 'Row',
          columncount: 2,
          elements: [],
          meta_id: 0,
          style: 'Default'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.changeStyle);
        this.listenTo(this.layout.model, "change:columncount", this.columnCountChanged);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getRowView = function() {
        return new Row.Views.RowView({
          model: this.layout.model
        });
      };

      Controller.prototype.columnCountChanged = function(model) {
        return this.layout.elementRegion.currentView.triggerMethod("column:count:changed", model.get('columncount'));
      };

      Controller.prototype.changeStyle = function(model) {
        var newStyle, prevStyle, _ref;
        prevStyle = (_ref = model.previous('style')) != null ? _ref : '';
        newStyle = model.get('style');
        this.layout.elementRegion.currentView.triggerMethod("style:changed", _.slugify(newStyle), _.slugify(prevStyle));
        return this.layout.setHiddenField('style', newStyle);
      };

      Controller.prototype.renderElement = function() {
        var row;
        this.removeSpinner();
        row = this._getRowView();
        this.listenTo(row, 'show', (function(_this) {
          return function() {
            if (_this.isNew) {
              return App.vent.trigger("show:row:settings:popup", _this.layout.model);
            }
          };
        })(this));
        this.listenTo(row, "itemview:element:moved", this.elementMoved);
        this.layout.elementRegion.show(row);
        return this.changeStyle(this.layout.model);
      };

      Controller.prototype.elementMoved = function(columnView, container) {};

      Controller.prototype.deleteElement = function(model) {
        if (!this.layout.elementRegion.currentView.$el.canBeDeleted()) {
          return bootbox.confirm("All elements inside the row will also be deleted. Do you want to continue?", function(answer) {
            if (answer === true) {
              model.destroy();
              return _.delay(function() {
                return App.commands.execute("auto:save");
              }, 700);
            }
          });
        } else {
          return model.destroy();
        }
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
