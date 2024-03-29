var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalSmartTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptySmartTableView, OriginalSmartTableItemView, OriginalSmartTableView;
    OriginalSmartTableItemView = (function(_super) {
      __extends(OriginalSmartTableItemView, _super);

      function OriginalSmartTableItemView() {
        return OriginalSmartTableItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalSmartTableItemView.prototype.className = 'smart-cell';

      OriginalSmartTableItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">Heading</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{#dtExist}}{{{dt}}}{{/dtExist}} </div> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">Description</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{#ddExist}}{{{dd}}}{{/ddExist}} </div> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">Attribute</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{#emExist}}{{{em}}}{{/emExist}} </div> </div> </div> </div> </div>';

      OriginalSmartTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      OriginalSmartTableItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalSmartTableItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      return OriginalSmartTableItemView;

    })(Marionette.ItemView);
    OriginalSmartTableView = (function(_super) {
      __extends(OriginalSmartTableView, _super);

      function OriginalSmartTableView() {
        return OriginalSmartTableView.__super__.constructor.apply(this, arguments);
      }

      OriginalSmartTableView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>{{style}} {{element}}</small><a data-toggle="collapse" data-target=".dashboard-smarttable-{{meta_id}}" class="smart-collapse hide">Expand</a></h6> <div class="original-smart-table dashboard-smarttable-{{meta_id}} collapse"> </div> <hr class="dark">';

      OriginalSmartTableView.prototype.itemView = OriginalSmartTableItemView;

      OriginalSmartTableView.prototype.itemViewContainer = '.original-smart-table';

      OriginalSmartTableView.prototype.events = {
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

      OriginalSmartTableView.prototype.initialize = function() {
        var collection, completeContent, smartTableMetaId;
        completeContent = this.model.get('contents');
        collection = new Backbone.Collection(completeContent[WPML_DEFAULT_LANG]);
        this.collection = collection;
        smartTableMetaId = this.model.get('meta_id');
        return this.listenTo(App.vent, "translated:smartable:loaded:" + smartTableMetaId, function() {
          return this.$el.find('.smart-collapse').removeClass('hide');
        });
      };

      return OriginalSmartTableView;

    })(Marionette.CompositeView);
    EmptySmartTableView = (function(_super) {
      __extends(EmptySmartTableView, _super);

      function EmptySmartTableView() {
        return EmptySmartTableView.__super__.constructor.apply(this, arguments);
      }

      EmptySmartTableView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}You have no smart tables to translate{{/polyglot}}</div><br/>';

      return EmptySmartTableView;

    })(Marionette.ItemView);
    return Views.OriginalSmartTablesView = (function(_super) {
      __extends(OriginalSmartTablesView, _super);

      function OriginalSmartTablesView() {
        return OriginalSmartTablesView.__super__.constructor.apply(this, arguments);
      }

      OriginalSmartTablesView.prototype.template = '<div id="original-smart-page-table"></div>';

      OriginalSmartTablesView.prototype.itemView = OriginalSmartTableView;

      OriginalSmartTablesView.prototype.emptyView = EmptySmartTableView;

      OriginalSmartTablesView.prototype.itemViewContainer = '#original-smart-page-table';

      return OriginalSmartTablesView;

    })(Marionette.CompositeView);
  });
});
