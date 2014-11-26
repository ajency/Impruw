var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-menus/original-menu/templates/originalmenuview.html'], function(App, originalmenuviewTpl) {
  return App.module('LanguageApp.LanguageMenuContent.OriginalMenu.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalMenuItemView;
    OriginalMenuItemView = (function(_super) {
      __extends(OriginalMenuItemView, _super);

      function OriginalMenuItemView() {
        return OriginalMenuItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalMenuItemView.prototype.tagName = 'div';

      OriginalMenuItemView.prototype.className = 'form-group legend-group';

      OriginalMenuItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{element_in_language}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original {{TypeOfElementClass}}" tabindex="1"> {{{originalContent}}} </div> </div> </div> </div>';

      OriginalMenuItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalMenuItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.TypeOfElementClass = function() {
          if ((data.element === "Title") || (data.element === "Link")) {
            return "title";
          } else {
            return "text";
          }
        };
        data.originalContent = function() {
          var originalContent;
          if (data.element === "Link") {
            originalContent = data.text[WPML_DEFAULT_LANG];
            return originalContent;
          } else {
            originalContent = data.content[WPML_DEFAULT_LANG];
            return originalContent;
          }
        };
        data.element_in_language = function() {
          var element_in_language;
          element_in_language = _.polyglot.t(data.element);
          return element_in_language;
        };
        return data;
      };

      return OriginalMenuItemView;

    })(Marionette.ItemView);
    return Views.OriginalMenuView = (function(_super) {
      __extends(OriginalMenuView, _super);

      function OriginalMenuView() {
        return OriginalMenuView.__super__.constructor.apply(this, arguments);
      }

      OriginalMenuView.prototype.template = originalmenuviewTpl;

      OriginalMenuView.prototype.itemView = OriginalMenuItemView;

      OriginalMenuView.prototype.itemViewContainer = '#translatable-menu-elements';

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
