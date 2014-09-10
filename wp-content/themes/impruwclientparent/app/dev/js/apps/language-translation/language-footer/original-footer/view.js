var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-footer/original-footer/templates/originalfooterview.html'], function(App, originalfooterviewTpl) {
  return App.module('LanguageApp.LanguageFooterContent.OriginalFooter.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalFooterItemView;
    OriginalFooterItemView = (function(_super) {
      __extends(OriginalFooterItemView, _super);

      function OriginalFooterItemView() {
        return OriginalFooterItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalFooterItemView.prototype.tagName = 'div';

      OriginalFooterItemView.prototype.className = 'form-group legend-group';

      OriginalFooterItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{element_in_language}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original {{TypeOfElementClass}}" tabindex="1"> {{{originalContent}}} </p> </div> </div> </div>';

      OriginalFooterItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalFooterItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      return OriginalFooterItemView;

    })(Marionette.ItemView);
    return Views.OriginalFooterView = (function(_super) {
      __extends(OriginalFooterView, _super);

      function OriginalFooterView() {
        return OriginalFooterView.__super__.constructor.apply(this, arguments);
      }

      OriginalFooterView.prototype.template = originalfooterviewTpl;

      OriginalFooterView.prototype.itemView = OriginalFooterItemView;

      OriginalFooterView.prototype.itemViewContainer = '#translatable-footer-elements';

      OriginalFooterView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalFooterView.__super__.mixinTemplateHelpers.call(this, data);
        data.language = function() {
          return WPML_DEFAULT_LANGUAGE_NAME;
        };
        return data;
      };

      return OriginalFooterView;

    })(Marionette.CompositeView);
  });
});
