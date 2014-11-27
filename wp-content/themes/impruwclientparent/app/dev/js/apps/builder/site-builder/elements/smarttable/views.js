var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.SmartTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SmartTableItem;
    SmartTableItem = (function(_super) {
      __extends(SmartTableItem, _super);

      function SmartTableItem() {
        return SmartTableItem.__super__.constructor.apply(this, arguments);
      }

      SmartTableItem.prototype.tagName = 'dl';

      SmartTableItem.prototype.className = 'smart-cell';

      SmartTableItem.prototype.template = '{{#dtExist}}<dt contenteditable="true" data-key="dt">{{dt}}</dt>{{/dtExist}} {{#ddExist}}<dd contenteditable="true" data-key="dd">{{dd}}</dd>{{/ddExist}} {{#emExist}}<dd class="emphasis" contenteditable="true" data-key="em">{{em}}</dd>{{/emExist}} <dd class="delete"><a href="#" title="Delete Item"><span class="bicon icon-uniF16F"></span></a></dd>';

      SmartTableItem.prototype.mixinTemplateHelpers = function(data) {
        data = SmartTableItem.__super__.mixinTemplateHelpers.call(this, data);
        if ((data.dt != null) && data.dt !== '') {
          data.dtExist = true;
        }
        if ((data.dd != null) && data.dd !== '') {
          data.ddExist = true;
        }
        if ((data.em != null) && data.em !== '') {
          data.emExist = true;
        }
        data.dt = _.stripslashes(data.dt);
        data.dd = _.stripslashes(data.dd);
        data.em = _.stripslashes(data.em);
        return data;
      };

      SmartTableItem.prototype.modelEvents = {
        'change': function() {
          if (this.model.hasChanged()) {
            return this.trigger("save:smart:table");
          }
        }
      };

      SmartTableItem.prototype.events = {
        'focus dt, dd': function(e) {
          e.stopPropagation();
          return $(e.target).addClass('focus');
        },
        'blur dt, dd': function(e) {
          e.stopPropagation();
          $(e.target).removeClass('focus');
          return this.model.set($(e.target).attr('data-key'), $(e.target).text());
        },
        'click .delete a': function(e) {
          e.stopPropagation();
          return this.model.destroy({
            index: this.model.collection.indexOf(this.model)
          });
        }
      };

      return SmartTableItem;

    })(Marionette.ItemView);
    return Views.TableView = (function(_super) {
      __extends(TableView, _super);

      function TableView() {
        return TableView.__super__.constructor.apply(this, arguments);
      }

      TableView.prototype.className = 'smart-table';

      TableView.prototype.template = '<div class="smart-content"></div> <div class="add-another"> <span class="bicon icon-uniF193"></span> Add Another Item </div>';

      TableView.prototype.itemView = SmartTableItem;

      TableView.prototype.itemViewContainer = '.smart-content';

      TableView.prototype.events = {
        'click .add-another': function() {
          return this.trigger('add:new:model:to:collection');
        }
      };

      TableView.prototype.onRender = function() {
        var innerStyle, style;
        style = _.slugify(this.model.get('style'));
        this.$el.addClass(style);
        innerStyle = _.slugify(this.model.get('innerStyle'));
        return this.$el.addClass(innerStyle);
      };

      TableView.prototype.onShow = function() {};

      return TableView;

    })(Marionette.CompositeView);
  });
});
