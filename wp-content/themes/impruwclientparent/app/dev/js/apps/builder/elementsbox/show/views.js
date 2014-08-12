var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/elementsbox/show/templates/main.html', 'text!apps/builder/elementsbox/show/templates/error.html'], function(App, mainviewTpl, singleEleTpl, errorTpl) {
  return App.module('ElementsBoxApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.SingleElement = (function(_super) {
      __extends(SingleElement, _super);

      function SingleElement() {
        return SingleElement.__super__.constructor.apply(this, arguments);
      }

      SingleElement.prototype.tagName = 'li';

      SingleElement.prototype.className = 'element';

      SingleElement.prototype.template = '<a href="#" class="drag builder-element"> <div class="aj-imp-builder-icon {{icon}}"></div> <div class="aj-imp-builder-title">{{elementName}}</div> </a>';

      SingleElement.prototype.serializeData = function() {
        var data;
        data = SingleElement.__super__.serializeData.call(this);
        data.elementName = function() {
          if (this.title) {
            return _.polyglot.t(this.title);
          } else {
            return _.polyglot.t(this.element);
          }
        };
        return data;
      };

      SingleElement.prototype.onRender = function() {
        return this.$el.attr('data-element', this.model.get('element'));
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

      MainView.prototype.onShow = function() {
        this.$el.css('position', 'fixed').draggable({
          handle: "p.desc",
          addClasses: false,
          containment: 'document',
          scroll: true
        });
        return this._setDraggableElements();
      };

      MainView.prototype.appendHtml = function(cv, view, index) {
        var category;
        if (view.model.get('element') === 'Row') {
          return;
        }
        category = view.model.get('category') || 'content';
        switch (category) {
          case 'hotel':
            this.$el.find('#hotel-elements ul').append(view.$el);
            break;
          case 'room':
            this.$el.find('#room-elements ul').append(view.$el);
            break;
          default:
            this.$el.find('#content-elements ul').append(view.$el);
        }
        this._ifSingleRoom();
        return this._setDraggableElements();
      };

      MainView.prototype._ifSingleRoom = function() {
        var isSingleRoom, roomSummaryhtml;
        isSingleRoom = Marionette.getOption(this, 'singleroom');
        if (!isSingleRoom) {
          this.$el.find('#room-elements ul').remove();
          roomSummaryhtml = '<ul class="aj-imp-builder-items clearfix"> <li class="element" data-element="RoomSummary"> <a href="#" class="drag builder-element"> <div class="aj-imp-builder-icon bicon icon-uniF15B"></div> <div class="aj-imp-builder-title">Display Rooms</div> </a> </li> </ul>';
          return this.$el.find('#room-elements').append(roomSummaryhtml);
        }
      };

      MainView.prototype._setDraggableElements = function() {
        return this.$el.find('*[data-element]').draggable({
          connectToSortable: '.droppable-column',
          helper: this._getHelper,
          delay: 5,
          addClasses: false,
          distance: 5,
          revert: 'invalid'
        });
      };

      MainView.prototype._getHelper = function() {
        return '<div class="element-helper"></div> ';
      };

      return MainView;

    })(Marionette.CompositeView);
  });
});
