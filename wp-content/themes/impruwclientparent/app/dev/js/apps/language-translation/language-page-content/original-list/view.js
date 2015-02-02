var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalListTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyListTableView, OriginalListTableItemView, OriginalListTableView;
    OriginalListTableItemView = (function(_super) {
      __extends(OriginalListTableItemView, _super);

      function OriginalListTableItemView() {
        return OriginalListTableItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalListTableItemView.prototype.className = 'smart-cell';

      OriginalListTableItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{{data}}} </div> </div> </div> </div> </div>';

      OriginalListTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      return OriginalListTableItemView;

    })(Marionette.ItemView);
    OriginalListTableView = (function(_super) {
      __extends(OriginalListTableView, _super);

      function OriginalListTableView() {
        return OriginalListTableView.__super__.constructor.apply(this, arguments);
      }

      OriginalListTableView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>{{style}} {{element}}</small></h6> <div class="original-list-table dashboard-listtable-{{meta_id}}"> </div> <hr class="dark">';

      OriginalListTableView.prototype.itemView = OriginalListTableItemView;

      OriginalListTableView.prototype.itemViewContainer = '.original-list-table';

      OriginalListTableView.prototype.events = {
        'click a.smart-collapse': function(e) {
          var expandOrContact;
          e.preventDefault();
          expandOrContact = $(e.target).html();
          if (expandOrContact === 'Expand') {
            return $(e.target).html('Contract');
          } else if (expandOrContact === 'Contract') {
            return $(e.target).html('Expand');
          }
        }
      };

      OriginalListTableView.prototype.initialize = function() {
        var collection, completeContent, listTableMetaId;
        completeContent = this.model.get('contents');
        collection = new Backbone.Collection(completeContent[WPML_DEFAULT_LANG]);
        this.collection = collection;
        listTableMetaId = this.model.get('meta_id');
        return this.listenTo(App.vent, "translated:listtable:loaded:" + listTableMetaId, function() {
          return this.$el.find('.smart-collapse').removeClass('hide');
        });
      };

      return OriginalListTableView;

    })(Marionette.CompositeView);
    EmptyListTableView = (function(_super) {
      __extends(EmptyListTableView, _super);

      function EmptyListTableView() {
        return EmptyListTableView.__super__.constructor.apply(this, arguments);
      }

      EmptyListTableView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}You have no lists to translate{{/polyglot}}</div><br/>';

      return EmptyListTableView;

    })(Marionette.ItemView);
    return Views.OriginalListTablesView = (function(_super) {
      __extends(OriginalListTablesView, _super);

      function OriginalListTablesView() {
        return OriginalListTablesView.__super__.constructor.apply(this, arguments);
      }

      OriginalListTablesView.prototype.template = '<div id="original-list-page-table"></div>';

      OriginalListTablesView.prototype.itemView = OriginalListTableView;

      OriginalListTablesView.prototype.emptyView = EmptyListTableView;

      OriginalListTablesView.prototype.itemViewContainer = '#original-list-page-table';

      return OriginalListTablesView;

    })(Marionette.CompositeView);
  });
});
