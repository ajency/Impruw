var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedTabAccordion.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedTabPaneItemView, TranslatedTabPanesView;
    TranslatedTabPaneItemView = (function(_super) {
      __extends(TranslatedTabPaneItemView, _super);

      function TranslatedTabPaneItemView() {
        return TranslatedTabPaneItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabPaneItemView.prototype.className = 'smart-cell';

      TranslatedTabPaneItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title"  value="{{tabName}}"> </div> </div> </div> </div>';

      TranslatedTabPaneItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      TranslatedTabPaneItemView.prototype.serializeData = function() {
        var data;
        data = TranslatedTabPaneItemView.__super__.serializeData.call(this);
        data.dd = _.stripslashes(data.dd);
        data.dt = _.stripslashes(data.dt);
        data.em = _.stripslashes(data.em);
        return data;
      };

      TranslatedTabPaneItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage;
        data = TranslatedTabPaneItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return data;
      };

      return TranslatedTabPaneItemView;

    })(Marionette.ItemView);
    TranslatedTabPanesView = (function(_super) {
      __extends(TranslatedTabPanesView, _super);

      function TranslatedTabPanesView() {
        return TranslatedTabPanesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabPanesView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div class="dashboard-tabaccordion-{{ID}}"> <div class = "translated-tab-accordion" ></div> <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-tabaccordion-translation-element">Save</button> </div> <hr class="dark">';

      TranslatedTabPanesView.prototype.itemView = TranslatedTabPaneItemView;

      TranslatedTabPanesView.prototype.itemViewContainer = '.translated-tab-accordion';

      TranslatedTabPanesView.prototype.events = {
        'click .btn-save-smarttable-translation-element': function(e) {
          var data;
          e.preventDefault();
          data = Backbone.Syphon.serialize(this);
          return this.trigger("page:smarttable:updated", data);
        }
      };

      TranslatedTabPanesView.prototype.itemViewOptions = function(model, index) {
        var editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return {
          editingLanguage: editingLanguage,
          smarttableIndex: index
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
    return Views.TranslatedTabAccordionView = (function(_super) {
      __extends(TranslatedTabAccordionView, _super);

      function TranslatedTabAccordionView() {
        return TranslatedTabAccordionView.__super__.constructor.apply(this, arguments);
      }

      TranslatedTabAccordionView.prototype.template = '<div id="translated-tab-accordions"></div>';

      TranslatedTabAccordionView.prototype.itemView = TranslatedTabPanesView;

      TranslatedTabAccordionView.prototype.itemViewContainer = '#translated-tab-accordions';

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
