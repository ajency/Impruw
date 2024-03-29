var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalTabAccordion.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyOriginalTabAccordionItemView, EmptyOriginalTabAccordionView, OriginalTabPaneItemView, OriginalTabPanesView;
    OriginalTabPaneItemView = (function(_super) {
      __extends(OriginalTabPaneItemView, _super);

      function OriginalTabPaneItemView() {
        return OriginalTabPaneItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalTabPaneItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <label for="" class="col-sm-3 control-label">{{#polyglot}}Name{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <div tabindex="1" class="original title"> {{tabNameLang}} </div> </div> </div> </div> </div>';

      OriginalTabPaneItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      OriginalTabPaneItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalTabPaneItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.tabNameLang = function() {
          var tabname;
          tabname = data.tabName;
          return tabname[WPML_DEFAULT_LANG];
        };
        return data;
      };

      return OriginalTabPaneItemView;

    })(Marionette.ItemView);
    EmptyOriginalTabAccordionItemView = (function(_super) {
      __extends(EmptyOriginalTabAccordionItemView, _super);

      function EmptyOriginalTabAccordionItemView() {
        return EmptyOriginalTabAccordionItemView.__super__.constructor.apply(this, arguments);
      }

      EmptyOriginalTabAccordionItemView.prototype.template = '<br/><div class="empty-info">{{noTabType}}</div><br/>';

      EmptyOriginalTabAccordionItemView.prototype.serializeData = function() {
        var data, tabType;
        data = EmptyOriginalTabAccordionItemView.__super__.serializeData.call(this);
        tabType = Marionette.getOption(this, 'tabType');
        data.noTabType = _.polyglot.t("You have no " + tabType + " to translate");
        return data;
      };

      return EmptyOriginalTabAccordionItemView;

    })(Marionette.ItemView);
    OriginalTabPanesView = (function(_super) {
      __extends(OriginalTabPanesView, _super);

      function OriginalTabPanesView() {
        return OriginalTabPanesView.__super__.constructor.apply(this, arguments);
      }

      OriginalTabPanesView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>{{tabType}}</small><a data-toggle="collapse" data-target=".dashboard-{{tabType}}-{{ID}}" class="smart-collapse hide">Expand</a></h6> <div class="original-tab-pane dashboard-{{tabType}}-{{ID}} collapse"> </div> <hr class="dark">';

      OriginalTabPanesView.prototype.itemView = OriginalTabPaneItemView;

      OriginalTabPanesView.prototype.emptyView = EmptyOriginalTabAccordionItemView;

      OriginalTabPanesView.prototype.itemViewContainer = '.original-tab-pane';

      OriginalTabPanesView.prototype.events = {
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

      OriginalTabPanesView.prototype.initialize = function() {
        var collection, completeContent, tabAccordionId;
        completeContent = this.model.get('tabElements');
        collection = new Backbone.Collection(completeContent);
        this.collection = collection;
        tabAccordionId = this.model.get('ID');
        return this.listenTo(App.vent, "translated:tabs:accordions:loaded:" + tabAccordionId, function() {
          return this.$el.find('.smart-collapse').removeClass('hide');
        });
      };

      OriginalTabPanesView.prototype.itemViewOptions = function() {
        var tabType;
        tabType = this.model.get('tabType');
        return {
          tabType: tabType
        };
      };

      return OriginalTabPanesView;

    })(Marionette.CompositeView);
    EmptyOriginalTabAccordionView = (function(_super) {
      __extends(EmptyOriginalTabAccordionView, _super);

      function EmptyOriginalTabAccordionView() {
        return EmptyOriginalTabAccordionView.__super__.constructor.apply(this, arguments);
      }

      EmptyOriginalTabAccordionView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}You have no tabs or accordion headings to translate{{/polyglot}}</div><br/>';

      return EmptyOriginalTabAccordionView;

    })(Marionette.ItemView);
    return Views.OriginalTabAccordionView = (function(_super) {
      __extends(OriginalTabAccordionView, _super);

      function OriginalTabAccordionView() {
        return OriginalTabAccordionView.__super__.constructor.apply(this, arguments);
      }

      OriginalTabAccordionView.prototype.template = '<div id="original-tab-accordions"></div>';

      OriginalTabAccordionView.prototype.itemView = OriginalTabPanesView;

      OriginalTabAccordionView.prototype.emptyView = EmptyOriginalTabAccordionView;

      OriginalTabAccordionView.prototype.itemViewContainer = '#original-tab-accordions';

      return OriginalTabAccordionView;

    })(Marionette.CompositeView);
  });
});
