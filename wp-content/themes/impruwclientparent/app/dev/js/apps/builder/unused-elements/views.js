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
        var serializedData;
        serializedData = SingleUnusedElement.__super__.serializeData.call(this);
        serializedData.element = _.str.capitalize(serializedData.element);
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

      UnsedElementsViews.prototype.template = '<div class="handle-right"><span class="bicon icon-uniF162"></span></div> <div class="aj-imp-builder-top-options "> <a href="#" class="builder-help">{{#polyglot}}Need Help{{/polyglot}}&nbsp;<span class="bicon icon-uniF13B"></span></a> </div> <a href="#choose-theme" class="btn btn-xs choose-theme"><span class="bicon icon-uniF185"></span>{{#polyglot}}Switch Theme{{/polyglot}}</a> <div id="aj-imp-color-sel"> <!-- <a class="btn btn-default" data-toggle="modal" href="#theme-color-pop">Change Theme Colors</a> --> <a class="btn btn-default">{{#polyglot}}Change Theme Colors{{/polyglot}}</a> </div> <div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> {{#polyglot}}Unused Elements{{/polyglot}}</span></div> <div class="menu aj-imp-drag-menu"> <p class="desc"> {{#polyglot}}Unused deleted elements{{/polyglot}} </p> <a href="#" class="trash-elem-link"><span class="bicon icon-uniF16F"></span> {{#polyglot}}Clear Elements{{/polyglot}}</a> <ul class="trash-list"> </ul> </div> </div>';

      UnsedElementsViews.prototype.itemViewContainer = 'ul.trash-list';

      UnsedElementsViews.prototype.events = {
        'click #aj-imp-color-sel': function() {
          return this.trigger("show:theme:color:clicked");
        }
      };

      UnsedElementsViews.prototype.onShow = function() {
        var flMenuTriggers;
        this.$el.tabSlideOut({
          tabHandle: '.handle-right',
          tabLocation: 'right',
          speed: 300,
          action: 'click',
          topPos: '90px',
          fixedPosition: true
        });
        flMenuTriggers = $("#fl_menu .label span, #fl_menu .menu");
        flMenuTriggers.hover(function() {
          return $("#fl_menu .menu").show();
        }, function() {
          return $("#fl_menu .menu").hide();
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
