var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedListTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedListTableItemView, TranslatedListTableView;
    TranslatedListTableItemView = (function(_super) {
      __extends(TranslatedListTableItemView, _super);

      function TranslatedListTableItemView() {
        return TranslatedListTableItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedListTableItemView.prototype.className = 'smart-cell';

      TranslatedListTableItemView.prototype.template = '<div class="form-group legend-group"> <div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <input type="text" class="form-control translated-element-content title translated-listtable-data" value="{{data}}" name="{{dataInputName}}"> </div> </div> </div> </div>';

      TranslatedListTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      TranslatedListTableItemView.prototype.serializeData = function() {
        var data;
        data = TranslatedListTableItemView.__super__.serializeData.call(this);
        data.data = _.stripslashes(data.data);
        return data;
      };

      TranslatedListTableItemView.prototype.mixinTemplateHelpers = function(data) {
        var editingLanguage, listtableIndex;
        data = TranslatedListTableItemView.__super__.mixinTemplateHelpers.call(this, data);
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        listtableIndex = Marionette.getOption(this, 'listtableIndex');
        data.dataInputName = function() {
          var dataInputName;
          dataInputName = editingLanguage + "[" + listtableIndex + "][data]";
          dataInputName.toString();
          return dataInputName;
        };
        return data;
      };

      return TranslatedListTableItemView;

    })(Marionette.ItemView);
    TranslatedListTableView = (function(_super) {
      __extends(TranslatedListTableView, _super);

      function TranslatedListTableView() {
        return TranslatedListTableView.__super__.constructor.apply(this, arguments);
      }

      TranslatedListTableView.prototype.tagName = 'form';

      TranslatedListTableView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</small></h6> <div class="dashboard-listtable-{{meta_id}} collapse"> <div class = "translated-list-table" ></div> <button class="btn btn-default aj-imp-orange-btn btn-xs btn-save-listtable-translation-element">Save List</button> </div> <hr class="dark">';

      TranslatedListTableView.prototype.itemView = TranslatedListTableItemView;

      TranslatedListTableView.prototype.itemViewContainer = '.translated-list-table';

      TranslatedListTableView.prototype.events = {
        'click .btn-save-listtable-translation-element': function(e) {
          var data;
          e.preventDefault();
          data = Backbone.Syphon.serialize(this);
          return this.trigger("page:listtable:updated", data);
        }
      };

      TranslatedListTableView.prototype.itemViewOptions = function(model, index) {
        var editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        return {
          editingLanguage: editingLanguage,
          listtableIndex: index
        };
      };

      TranslatedListTableView.prototype.initialize = function() {
        var collection, completeContent, editingLanguage;
        editingLanguage = Marionette.getOption(this, 'editingLanguage');
        completeContent = this.model.get('contents');
        collection = new Backbone.Collection(completeContent[editingLanguage]);
        if (collection.length === 0) {
          collection = new Backbone.Collection(completeContent[WPML_DEFAULT_LANG]);
        }
        return this.collection = collection;
      };

      TranslatedListTableView.prototype.onShow = function() {
        var listTableMetaId;
        listTableMetaId = this.model.get('meta_id');
        return App.vent.trigger("translated:listtable:loaded:" + listTableMetaId);
      };

      return TranslatedListTableView;

    })(Marionette.CompositeView);
    return Views.TranslatedListTablesView = (function(_super) {
      __extends(TranslatedListTablesView, _super);

      function TranslatedListTablesView() {
        return TranslatedListTablesView.__super__.constructor.apply(this, arguments);
      }

      TranslatedListTablesView.prototype.template = '<div id="translated-list-page-table"></div>';

      TranslatedListTablesView.prototype.itemView = TranslatedListTableView;

      TranslatedListTablesView.prototype.itemViewContainer = '#translated-list-page-table';

      TranslatedListTablesView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      TranslatedListTablesView.prototype.onTranslateListtableUpdated = function() {
        return console.log("Succes");
      };

      return TranslatedListTablesView;

    })(Marionette.CompositeView);
  });
});
