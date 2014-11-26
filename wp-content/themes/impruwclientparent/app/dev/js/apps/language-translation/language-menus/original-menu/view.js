var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-menus/original-menu/templates/originalmenuview.html'], function(App, originalmenuviewTpl) {
  return App.module('LanguageApp.LanguageMenuContent.OriginalMenu.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyMenuItemView, EmptyNavMenuView, OriginalMenuItemView, OriginalNavMenuView;
    OriginalMenuItemView = (function(_super) {
      __extends(OriginalMenuItemView, _super);

      function OriginalMenuItemView() {
        return OriginalMenuItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalMenuItemView.prototype.tagName = 'div';

      OriginalMenuItemView.prototype.className = 'form-group legend-group';

      OriginalMenuItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{#polyglot}}Menu item{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original title" tabindex="1"> {{title}} </div> </div> </div> </div>';

      OriginalMenuItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalMenuItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.element_in_language = function() {
          var element_in_language;
          element_in_language = _.polyglot.t(data.element);
          return element_in_language;
        };
        return data;
      };

      return OriginalMenuItemView;

    })(Marionette.ItemView);
    EmptyMenuItemView = (function(_super) {
      __extends(EmptyMenuItemView, _super);

      function EmptyMenuItemView() {
        return EmptyMenuItemView.__super__.constructor.apply(this, arguments);
      }

      EmptyMenuItemView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}No custom menu items to translate{{/polyglot}}</div><br/>';

      return EmptyMenuItemView;

    })(Marionette.ItemView);
    OriginalNavMenuView = (function(_super) {
      __extends(OriginalNavMenuView, _super);

      function OriginalNavMenuView() {
        return OriginalNavMenuView.__super__.constructor.apply(this, arguments);
      }

      OriginalNavMenuView.prototype.template = '<h6 class="aj-imp-sub-head-thin"><small>{{#polyglot}}Menu Name: {{/polyglot}}{{name}}</small></h6> <div class="original-menu-items"> </div> <hr>';

      OriginalNavMenuView.prototype.itemView = OriginalMenuItemView;

      OriginalNavMenuView.prototype.itemViewContainer = '.original-menu-items';

      OriginalNavMenuView.prototype.emptyView = EmptyMenuItemView;

      OriginalNavMenuView.prototype.initialize = function() {
        var collection;
        collection = new Backbone.Collection(this.model.get('custom_menu_items'));
        return this.collection = collection;
      };

      return OriginalNavMenuView;

    })(Marionette.CompositeView);
    EmptyNavMenuView = (function(_super) {
      __extends(EmptyNavMenuView, _super);

      function EmptyNavMenuView() {
        return EmptyNavMenuView.__super__.constructor.apply(this, arguments);
      }

      EmptyNavMenuView.prototype.template = '<br/><div class="empty-info">{{#polyglot}}No menus to translate{{/polyglot}}</div><br/>';

      return EmptyNavMenuView;

    })(Marionette.ItemView);
    return Views.OriginalMenuView = (function(_super) {
      __extends(OriginalMenuView, _super);

      function OriginalMenuView() {
        return OriginalMenuView.__super__.constructor.apply(this, arguments);
      }

      OriginalMenuView.prototype.template = originalmenuviewTpl;

      OriginalMenuView.prototype.itemView = OriginalNavMenuView;

      OriginalMenuView.prototype.itemViewContainer = '#translatable-menu-elements';

      OriginalMenuView.prototype.emptyView = EmptyNavMenuView;

      OriginalMenuView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalMenuView.__super__.mixinTemplateHelpers.call(this, data);
        data.language = function() {
          return WPML_DEFAULT_LANGUAGE_NAME;
        };
        return data;
      };

      return OriginalMenuView;

    })(Marionette.CompositeView);
  });
});
