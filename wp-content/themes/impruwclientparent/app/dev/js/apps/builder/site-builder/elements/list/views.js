var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.List.Views', function(Views, App, Backbone, Marionette, $, _) {
    var ListItem;
    ListItem = (function(_super) {
      __extends(ListItem, _super);

      function ListItem() {
        return ListItem.__super__.constructor.apply(this, arguments);
      }

      ListItem.prototype.tagName = 'li';

      ListItem.prototype.template = '<span class="list-data" contenteditable="true">{{data}}</span> <div class="delete"><a href="#" title="Delete Item"><span class="bicon icon-uniF16F"></span></a></div>';

      ListItem.prototype.modelEvents = {
        'change': function() {
          if (this.model.hasChanged()) {
            return this.trigger("save:list");
          }
        }
      };

      ListItem.prototype.events = {
        'focus .list-data': function(e) {
          e.stopPropagation();
          return $(e.target).addClass('focus');
        },
        'blur .list-data': function(e) {
          e.stopPropagation();
          $(e.target).removeClass('focus');
          return this.model.set('data', $(e.target).text());
        },
        'click .delete a': function(e) {
          e.stopPropagation();
          return this.model.destroy({
            index: this.model.collection.indexOf(this.model)
          });
        }
      };

      return ListItem;

    })(Marionette.ItemView);
    return Views.ListView = (function(_super) {
      __extends(ListView, _super);

      function ListView() {
        return ListView.__super__.constructor.apply(this, arguments);
      }

      ListView.prototype.className = 'impruw-list';

      ListView.prototype.template = '<ul class="list-container {{style}} text-{{align}}"></ul> <div class="add-another"> <span class="bicon icon-uniF193"></span> Add Another Item </div>';

      ListView.prototype.itemView = ListItem;

      ListView.prototype.itemViewContainer = 'ul.list-container';

      ListView.prototype.events = {
        'click .add-another': function() {
          return this.trigger('add:new:model:to:collection');
        }
      };

      return ListView;

    })(Marionette.CompositeView);
  });
});
