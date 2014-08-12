var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-page-content/original-page-content/templates/originalpageview.html'], function(App, originalpageviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.OriginalPage.Views', function(Views, App, Backbone, Marionette, $, _) {
    var OriginalPageItemView;
    OriginalPageItemView = (function(_super) {
      __extends(OriginalPageItemView, _super);

      function OriginalPageItemView() {
        return OriginalPageItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalPageItemView.prototype.tagName = 'div';

      OriginalPageItemView.prototype.className = 'form-group legend-group';

      OriginalPageItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{element_in_language}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original {{TypeOfElementClass}}" tabindex="1"> {{{originalContent}}} </p> </div> </div> </div>';

      OriginalPageItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalPageItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      return OriginalPageItemView;

    })(Marionette.ItemView);
    return Views.OriginalPageView = (function(_super) {
      __extends(OriginalPageView, _super);

      function OriginalPageView() {
        return OriginalPageView.__super__.constructor.apply(this, arguments);
      }

      OriginalPageView.prototype.template = originalpageviewTpl;

      OriginalPageView.prototype.itemView = OriginalPageItemView;

      OriginalPageView.prototype.itemViewContainer = '#translatable-page-elements';

      OriginalPageView.prototype.serializeData = function() {
        var data;
        data = OriginalPageView.__super__.serializeData.call(this);
        data.language = _.polyglot.t(data.language);
        return data;
      };

      return OriginalPageView;

    })(Marionette.CompositeView);
  });
});
