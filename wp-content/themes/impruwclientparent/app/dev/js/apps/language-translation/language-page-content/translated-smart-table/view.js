var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedSmartTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedSmartTableItemView, TranslatedSmartTableView;
    TranslatedSmartTableItemView = (function(_super) {
      __extends(TranslatedSmartTableItemView, _super);

      function TranslatedSmartTableItemView() {
        return TranslatedSmartTableItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSmartTableItemView.prototype.className = 'smart-cell';

      TranslatedSmartTableItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{dt}}" name="{{dtInputName}}"> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{dd}}"  name="{{ddInputName}}"> </div> </div> </div> </div> <div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title" id="translated-smarttable-dt" value="{{em}}" name="{{emInputName}}"> </div> </div> </div> </div>';

      TranslatedSmartTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      TranslatedSmartTableItemView.prototype.serializeData = function() {
        var data;
        data = TranslatedSmartTableItemView.__super__.serializeData.call(this);
        data.dd = _.stripslashes(data.dd);
        data.dt = _.stripslashes(data.dt);
        data.em = _.stripslashes(data.em);
        return data;
      };

      TranslatedSmartTableItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage, smarttableIndex;
        data = TranslatedSmartTableItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        smarttableIndex = Marionette.getOption(this, 'smarttableIndex');
        data.ddInputName = function() {
          var ddInputName;
          ddInputName = editingLanguage + "[" + smarttableIndex + "][dd]";
          ddInputName.toString();
          return ddInputName;
        };
        data.dtInputName = function() {
          var dtInputName;
          dtInputName = editingLanguage + "[" + smarttableIndex + "][dt]";
          dtInputName.toString();
          return dtInputName;
        };
        data.emInputName = function() {
          var emInputName;
          emInputName = editingLanguage + "[" + smarttableIndex + "][em]";
          emInputName.toString();
          return emInputName;
        };
        return data;
      };

      return TranslatedSmartTableItemView;

    })(Marionette.ItemView);
    TranslatedSmartTableView = (function(_super) {
      __extends(TranslatedSmartTableView, _super);

      function TranslatedSmartTableView() {
        return TranslatedSmartTableView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSmartTableView.prototype.tagName = 'form';

      TranslatedSmartTableView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div class="dashboard-smarttable-{{meta_id}} collapse in"> <div class = "translated-smart-table" ></div> <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-smarttable-translation-element">Save Smart Table</button> </div> <hr class="dark">';

      TranslatedSmartTableView.prototype.itemView = TranslatedSmartTableItemView;

      TranslatedSmartTableView.prototype.itemViewContainer = '.translated-smart-table';

      TranslatedSmartTableView.prototype.events = {
        'click .btn-save-smarttable-translation-element': function(e) {
          var data;
          e.preventDefault();
          data = Backbone.Syphon.serialize(this);
          return this.trigger("page:smarttable:updated", data);
        }
      };

      TranslatedSmartTableView.prototype.itemViewOptions = function(model, index) {
        var editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return {
          editingLanguage: editingLanguage,
          smarttableIndex: index
        };
      };

      TranslatedSmartTableView.prototype.initialize = function() {
        var collection, completeContent, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        completeContent = this.model.get('contents');
        collection = new Backbone.Collection(completeContent[editingLanguage]);
        if (collection.length === 0) {
          collection = new Backbone.Collection(completeContent[WPML_DEFAULT_LANG]);
        }
        return this.collection = collection;
      };

      return TranslatedSmartTableView;

    })(Marionette.CompositeView);
    return Views.TranslatedSmartTablesView = (function(_super) {
      __extends(TranslatedSmartTablesView, _super);

      function TranslatedSmartTablesView() {
        return TranslatedSmartTablesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedSmartTablesView.prototype.template = '<div id="translated-smart-page-table"></div>';

      TranslatedSmartTablesView.prototype.itemView = TranslatedSmartTableView;

      TranslatedSmartTablesView.prototype.itemViewContainer = '#translated-smart-page-table';

      TranslatedSmartTablesView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedSmartTablesView;

    })(Marionette.CompositeView);
  });
});
