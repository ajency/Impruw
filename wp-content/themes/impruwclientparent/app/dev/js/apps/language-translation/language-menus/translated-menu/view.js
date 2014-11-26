var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-menus/translated-menu/templates/translatedmenuview.html'], function(App, translatedmenuviewTpl) {
  return App.module('LanguageApp.LanguageMenuContent.TranslatedMenu.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedMenuItemView, TranslatedNavMenuView;
    TranslatedMenuItemView = (function(_super) {
      __extends(TranslatedMenuItemView, _super);

      function TranslatedMenuItemView() {
        return TranslatedMenuItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedMenuItemView.prototype.tagName = 'div';

      TranslatedMenuItemView.prototype.className = 'form-group legend-group';

      TranslatedMenuItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group trans-field"> <div class="col-sm-10"> <input type="text" class="form-control title translated-menu-item" id="translated-slidercaption-title" value="{{title}}"> <button class="btn btn-xs trans-action aj-imp-orange-btn btn-save-menu-item-translation">{{#polyglot}} Save {{/polyglot}}</button> </div> </div> </div>';

      TranslatedMenuItemView.prototype.mixinTemplateHelpers = function(data) {
        data = TranslatedMenuItemView.__super__.mixinTemplateHelpers.call(this, data);
        return data;
      };

      return TranslatedMenuItemView;

    })(Marionette.ItemView);
    TranslatedNavMenuView = (function(_super) {
      __extends(TranslatedNavMenuView, _super);

      function TranslatedNavMenuView() {
        return TranslatedNavMenuView.__super__.constructor.apply(this, arguments);
      }

      TranslatedNavMenuView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>&nbsp;</h6> <div class="translated-menu-items"> </div> <hr>';

      TranslatedNavMenuView.prototype.itemView = TranslatedMenuItemView;

      TranslatedNavMenuView.prototype.itemViewContainer = '.translated-menu-items';

      TranslatedNavMenuView.prototype.initialize = function() {
        var collection;
        collection = new Backbone.Collection(this.model.get('custom_menu_items'));
        return this.collection = collection;
      };

      return TranslatedNavMenuView;

    })(Marionette.CompositeView);
    return Views.TranslatedMenuView = (function(_super) {
      __extends(TranslatedMenuView, _super);

      function TranslatedMenuView() {
        return TranslatedMenuView.__super__.constructor.apply(this, arguments);
      }

      TranslatedMenuView.prototype.template = translatedmenuviewTpl;

      TranslatedMenuView.prototype.itemView = TranslatedNavMenuView;

      TranslatedMenuView.prototype.itemViewContainer = '#translated-menu-elements';

      TranslatedMenuView.prototype.serializeData = function() {
        var data;
        data = TranslatedMenuView.__super__.serializeData.call(this);
        data.translation_language = _.polyglot.t(data.translation_language);
        return data;
      };

      TranslatedMenuView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          editingLanguage: language
        };
      };

      return TranslatedMenuView;

    })(Marionette.CompositeView);
  });
});
