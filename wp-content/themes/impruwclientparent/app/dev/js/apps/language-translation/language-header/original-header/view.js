var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-header/original-header/templates/originalheaderview.html'], function(App, originalheaderviewTpl) {
  return App.module('LanguageApp.LanguageHeaderContent.OriginalHeader.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalHeaderItemView;
    OriginalHeaderItemView = (function(_super) {
      __extends(OriginalHeaderItemView, _super);

      function OriginalHeaderItemView() {
        return OriginalHeaderItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalHeaderItemView.prototype.tagName = 'div';

      OriginalHeaderItemView.prototype.className = 'form-group legend-group';

      OriginalHeaderItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{element_in_language}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original {{TypeOfElementClass}}" tabindex="1"> {{{originalContent}}} </p> </div> </div> </div>';

      OriginalHeaderItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalHeaderItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      return OriginalHeaderItemView;

    })(Marionette.ItemView);
    return Views.OriginalHeaderView = (function(_super) {
      __extends(OriginalHeaderView, _super);

      function OriginalHeaderView() {
        return OriginalHeaderView.__super__.constructor.apply(this, arguments);
      }

      OriginalHeaderView.prototype.template = originalheaderviewTpl;

      OriginalHeaderView.prototype.itemView = OriginalHeaderItemView;

      OriginalHeaderView.prototype.itemViewContainer = '#translatable-header-elements';

      OriginalHeaderView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalHeaderView.__super__.mixinTemplateHelpers.call(this, data);
        data.language = function() {
          return WPML_DEFAULT_LANGUAGE_NAME;
        };
        return data;
      };

      return OriginalHeaderView;

    })(Marionette.CompositeView);
  });
});
