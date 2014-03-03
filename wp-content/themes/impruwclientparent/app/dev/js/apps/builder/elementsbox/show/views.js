var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/elementsbox/show/templates/main.html', 'text!apps/builder/elementsbox/show/templates/singleelement.html', 'text!apps/builder/elementsbox/show/templates/error.html'], function(App, mainviewTpl, singleEleTpl, errorTpl) {
  App.module('ElementsBoxApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.SingleElement = (function(_super) {
      __extends(SingleElement, _super);

      function SingleElement() {
        return SingleElement.__super__.constructor.apply(this, arguments);
      }

      SingleElement.prototype.template = singleEleTpl;

      SingleElement.prototype.serializeData = function() {
        var data;
        data = SingleElement.__super__.serializeData.call(this);
        data.elementName = function() {
          if (this.title) {
            return this.title;
          } else {
            return this.element;
          }
        };
        return data;
      };

      return SingleElement;

    })(Marionette.ItemView);
    return Views.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'aj-imp-drag-menu';

      MainView.prototype.id = 'controls-drag';

      MainView.prototype.itemView = Views.SingleElement;

      MainView.prototype.itemViewContainer = 'ul.aj-imp-builder-items';

      MainView.prototype.onShow = function() {
        this.$el.draggable({
          handle: "p.desc",
          addClasses: false
        });
        return this._setDraggableElements();
      };

      MainView.prototype._setDraggableElements = function() {
        return this.$el.find('*[data-element]').draggable({
          connectToSortable: '.droppable-column',
          helper: 'clone',
          delay: 5,
          addClasses: false,
          distance: 5,
          revert: 'invalid'
        });
      };

      return MainView;

    })(Marionette.CompositeView);
  });
  return App.ElementsBoxApp.Show.Views;
});
