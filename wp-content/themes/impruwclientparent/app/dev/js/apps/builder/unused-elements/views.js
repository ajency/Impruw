var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('UnusedElement.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyUnsedElementView, SingleUnusedElement;
    SingleUnusedElement = (function(_super) {
      __extends(SingleUnusedElement, _super);

      function SingleUnusedElement() {
        return SingleUnusedElement.__super__.constructor.apply(this, arguments);
      }

      SingleUnusedElement.prototype.tagName = 'li';

      SingleUnusedElement.prototype.className = 'trash-elem';

      SingleUnusedElement.prototype.template = '<a href="#"> <div class="trash-elem-header"> <span class="bicon icon-uniF111"></span> {{element}} </div> <div class="trash-elem-content"> {{content}} </div> </a>';

      SingleUnusedElement.prototype.serializeData = function() {
        var data;
        data = SingleUnusedElement.__super__.serializeData.call(this);
        data.element = _.str.capitalize(data.element);
        return data;
      };

      SingleUnusedElement.prototype.onRender = function() {
        return this.$el.attr('data-element', this.model.get('element')).attr('data-meta-id', this.model.get('meta_id'));
      };

      return SingleUnusedElement;

    })(Marionette.ItemView);
    EmptyUnsedElementView = (function(_super) {
      __extends(EmptyUnsedElementView, _super);

      function EmptyUnsedElementView() {
        return EmptyUnsedElementView.__super__.constructor.apply(this, arguments);
      }

      EmptyUnsedElementView.prototype.tagName = 'li';

      EmptyUnsedElementView.prototype.className = 'trash-elem';

      EmptyUnsedElementView.prototype.template = 'No unsed elements';

      return EmptyUnsedElementView;

    })(Marionette.ItemView);
    return Views.UnsedElementsViews = (function(_super) {
      __extends(UnsedElementsViews, _super);

      function UnsedElementsViews() {
        return UnsedElementsViews.__super__.constructor.apply(this, arguments);
      }

      UnsedElementsViews.prototype.itemView = SingleUnusedElement;

      UnsedElementsViews.prototype.emtpyView = EmptyUnsedElementView;

      UnsedElementsViews.prototype.template = '<div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> Unused Elements</span></div> <div class="menu aj-imp-drag-menu"> <p class="desc"> These are your unused or deleted elements, you can drag them back into your site, or clear them all. </p> <a href="#" class="trash-elem-link"><span class="bicon icon-uniF16F"></span> Clear Elements</a> <ul class="trash-list"> </ul> </div> </div>';

      UnsedElementsViews.prototype.itemViewContainer = 'ul.trash-list';

      UnsedElementsViews.prototype.onShow = function() {
        var FloatMenu, closedMenuOpacity, flMenu, flMenuLabel, flMenuMenu, floatEasing, floatSpeed, menuFadeSpeed, menuPosition;
        floatSpeed = 1500;
        floatEasing = "easeOutQuint";
        menuFadeSpeed = 500;
        closedMenuOpacity = 0.75;
        flMenu = $("#fl_menu");
        flMenuMenu = $("#fl_menu .menu");
        flMenuLabel = $("#fl_menu .label");
        FloatMenu = function() {
          var newPosition, scrollAmount;
          scrollAmount = $(document).scrollTop();
          newPosition = menuPosition + scrollAmount;
          if ($(window).height() < flMenu.height() + flMenuMenu.height()) {
            return flMenu.css("top", menuPosition);
          } else {
            return flMenu.stop().animate({
              top: newPosition
            }, floatSpeed, floatEasing);
          }
        };
        menuPosition = $("#fl_menu").position().top;
        menuPosition = $("#fl_menu").position().top;
        FloatMenu();
        flMenu.hover(function() {
          return $("#fl_menu .menu").fadeIn(menuFadeSpeed);
        }, function() {
          return $("#fl_menu .menu").fadeOut(menuFadeSpeed);
        });
        $(window).scroll(function() {
          return FloatMenu();
        });
        return this.makeElementsDraggable();
      };

      UnsedElementsViews.prototype.makeElementsDraggable = function() {
        return this.$el.find('*[data-element]').draggable({
          connectToSortable: '.droppable-column',
          delay: 5,
          addClasses: false,
          distance: 5,
          revert: 'invalid'
        });
      };

      return UnsedElementsViews;

    })(Marionette.CompositeView);
  });
});
