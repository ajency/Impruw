var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module('UnusedElement.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyUnsedElementView, SingleUnusedElement;
    SingleUnusedElement = (function(_super) {
      __extends(SingleUnusedElement, _super);

      function SingleUnusedElement() {
        return SingleUnusedElement.__super__.constructor.apply(this, arguments);
      }

      SingleUnusedElement.prototype.tagName = 'li';

      SingleUnusedElement.prototype.className = 'trash-elem';

      SingleUnusedElement.prototype.template = '<a href="#"> <div class="trash-elem-header"> <span class="bicon icon-uniF111"></span> {{element}} </div> <div class="trash-elem-content"> {{{content}}} </div> <button class="btn btn-small remove-element">Remove</button> </a>';

      SingleUnusedElement.prototype.events = {
        'click .remove-element': function(e) {
          return bootbox.confirm("<h4 class='delete-message'>" + (_.polyglot.t('Are you sure? This element will be lost. Cannot undo this action.')) + "</h4>", (function(_this) {
            return function(result) {
              if (result === true) {
                return _this.trigger('clear:element');
              }
            };
          })(this));
        }
      };

      SingleUnusedElement.prototype.serializeData = function() {
        var content, serializedData, _ref;
        serializedData = SingleUnusedElement.__super__.serializeData.call(this);
        serializedData.element = _.str.capitalize(serializedData.element);
        content = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        serializedData.content = _.stripslashes(content);
        return serializedData;
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

      UnsedElementsViews.prototype.template = '<div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> {{#polyglot}}Unused Elements{{/polyglot}}</span></div> <div class="menu aj-imp-drag-menu"> <p class="desc"> {{#polyglot}}Unused deleted elements{{/polyglot}} </p> <a href="#" class="trash-elem-link clear-all-elements"><span class="bicon icon-uniF16F"></span> {{#polyglot}}Clear Elements{{/polyglot}}</a> <ul class="trash-list"> </ul> </div> </div>';

      UnsedElementsViews.prototype.itemViewContainer = 'ul.trash-list';

      UnsedElementsViews.prototype.events = {
        'click a.clear-all-elements': function(e) {
          e.preventDefault();
          return bootbox.confirm("<h4 class='delete-message'>" + (_.polyglot.t('Are you sure? All elements will be lost. Cannot undo this action.')) + "</h4>", (function(_this) {
            return function(result) {
              if (result === true) {
                return _this.trigger('clear:all:elements');
              }
            };
          })(this));
        }
      };

      UnsedElementsViews.prototype.onElementsCleared = function() {
        this.$el.find('a.clear-all-elements').hide();
        return this.$el.fadeOut('fast', (function(_this) {
          return function() {
            return _this.close();
          };
        })(this));
      };

      UnsedElementsViews.prototype.onShow = function() {
        var FloatMenu, closedMenuOpacity, flMenu, flMenuMenu, flMenuTriggers, floatEasing, floatSpeed, menuFadeSpeed, menuPosition;
        floatSpeed = 1500;
        floatEasing = "easeOutQuint";
        menuFadeSpeed = 500;
        closedMenuOpacity = 0.75;
        flMenu = $("#fl_menu");
        flMenuMenu = $("#fl_menu .menu");
        flMenuTriggers = $("#fl_menu .label span, #fl_menu .menu");
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
        flMenuTriggers.hover(function() {
          return $("#fl_menu .menu").show();
        }, function() {
          return $("#fl_menu .menu").hide();
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

      UnsedElementsViews.prototype.onPageTookOver = function() {
        return this.$el.fadeOut();
      };

      UnsedElementsViews.prototype.onPageReleased = function() {
        return this.$el.fadeIn();
      };

      return UnsedElementsViews;

    })(Marionette.CompositeView);
  });
});
