var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTabAccordion.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyTranslatedTabAccordionView, EmptyTranslatedTabPanesView, TranslatedTabPaneItemView, TranslatedTabPanesView;
    TranslatedTabPaneItemView = (function(_super) {
      __extends(TranslatedTabPaneItemView, _super);

      function TranslatedTabPaneItemView() {
        return TranslatedTabPaneItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabPaneItemView.prototype.className = 'smart-cell';

      TranslatedTabPaneItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title"  value="{{tabNameLang}}" name="{{tabInputName}}"> </div> </div> </div> </div>';

      TranslatedTabPaneItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      TranslatedTabPaneItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage, tabIndex;
        data = TranslatedTabPaneItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        tabIndex = Marionette.getOption(this, 'tabIndex');
        data.tabInputName = function() {
          var tabInputName;
          tabInputName = "tabName[" + tabIndex + "]";
          tabInputName.toString();
          return tabInputName;
        };
        data.tabElementID = function() {
          var tabElementID;
          tabElementID = "tabElements[" + tabIndex + "][element_id]";
          tabElementID.toString();
          return tabElementID;
        };
        data.tabPosition = function() {
          var tabPosition;
          tabPosition = "tabElements[" + tabIndex + "][position]";
          tabPosition.toString();
          return tabPosition;
        };
        data.tabNameLang = function() {
          var tabname;
          tabname = data.tabName;
          return tabname[editingLanguage];
        };
        return data;
      };

      return TranslatedTabPaneItemView;

    })(Marionette.ItemView);
    EmptyTranslatedTabPanesView = (function(_super) {
      __extends(EmptyTranslatedTabPanesView, _super);

      function EmptyTranslatedTabPanesView() {
        return EmptyTranslatedTabPanesView.__super__.constructor.apply(this, arguments);
      }

      EmptyTranslatedTabPanesView.prototype.template = '<br/><div class="empty-info">&nbsp;</div><br/>';

      return EmptyTranslatedTabPanesView;

    })(Marionette.ItemView);
    TranslatedTabPanesView = (function(_super) {
      __extends(TranslatedTabPanesView, _super);

      function TranslatedTabPanesView() {
        return TranslatedTabPanesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabPanesView.prototype.tagName = 'form';

      TranslatedTabPanesView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div class="dashboard-tabaccordion-{{ID}} dashboard-{{tabType}}-{{ID}} collapse"> <div class = "translated-tab-accordion" ></div> {{#showButton}}<button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-tabaccordion-translation-element">{{#polyglot}}Save{{/polyglot}}</button>{{/showButton}} </div> <hr class="dark">';

      TranslatedTabPanesView.prototype.itemView = TranslatedTabPaneItemView;

      TranslatedTabPanesView.prototype.itemViewContainer = '.translated-tab-accordion';

      TranslatedTabPanesView.prototype.emptyView = EmptyTranslatedTabPanesView;

      TranslatedTabPanesView.prototype.events = {
        'click .btn-save-tabaccordion-translation-element': function(e) {
          var data;
          e.preventDefault();
          data = Backbone.Syphon.serialize(this);
          return this.trigger("page:tabaccordion:updated", data);
        }
      };

      TranslatedTabPanesView.prototype.serializeData = function() {
        var data;
        data = TranslatedTabPanesView.__super__.serializeData.call(this);
        if (this.collection.length === 0) {
          data.showButton = false;
        } else {
          data.showButton = true;
        }
        return data;
      };

      TranslatedTabPanesView.prototype.itemViewOptions = function(model, index) {
        var editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return {
          editingLanguage: editingLanguage,
          tabIndex: index
        };
      };

      TranslatedTabPanesView.prototype.initialize = function() {
        var collection, completeContent, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        completeContent = this.model.get('tabElements');
        collection = new Backbone.Collection(completeContent);
        return this.collection = collection;
      };

      TranslatedTabPanesView.prototype.onShow = function() {
        var tabAccordionId;
        tabAccordionId = this.model.get('ID');
        return App.vent.trigger("translated:tabs:accordions:loaded:" + tabAccordionId);
      };

      return TranslatedTabPanesView;

    })(Marionette.CompositeView);
    EmptyTranslatedTabAccordionView = (function(_super) {
      __extends(EmptyTranslatedTabAccordionView, _super);

      function EmptyTranslatedTabAccordionView() {
        return EmptyTranslatedTabAccordionView.__super__.constructor.apply(this, arguments);
      }

      EmptyTranslatedTabAccordionView.prototype.template = '<br/><div class="empty-info">&nbsp;</div><br/>';

      return EmptyTranslatedTabAccordionView;

    })(Marionette.ItemView);
    return Views.TranslatedTabAccordionView = (function(_super) {
      __extends(TranslatedTabAccordionView, _super);

      function TranslatedTabAccordionView() {
        return TranslatedTabAccordionView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabAccordionView.prototype.template = '<div id="translated-tab-accordions"></div>';

      TranslatedTabAccordionView.prototype.itemView = TranslatedTabPanesView;

      TranslatedTabAccordionView.prototype.itemViewContainer = '#translated-tab-accordions';

      TranslatedTabAccordionView.prototype.emptyView = EmptyTranslatedTabAccordionView;

      TranslatedTabAccordionView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      TranslatedTabAccordionView.prototype.onTranslateTabAccordionsUpdated = function() {
        return console.log("Succes");
      };

      return TranslatedTabAccordionView;

    })(Marionette.CompositeView);
  });
});
