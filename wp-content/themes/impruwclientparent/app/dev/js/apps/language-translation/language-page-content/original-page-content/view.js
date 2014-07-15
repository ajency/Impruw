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

      OriginalPageItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <label class="col-sm-3 control-label" for="">{{element}}</label> <div class="col-sm-9 col-sm-offset-3"> <p class="original {{TypeOfElementClass}}" tabindex="1"> {{{content.en}}} </p> </div> </div> </div>';

      OriginalPageItemView.prototype.mixinTemplateHelpers = function(data) {
        var originalLanguage;
        data = OriginalPageItemView.__super__.mixinTemplateHelpers.call(this, data);
        originalLanguage = Marionette.getOption(this, 'originalLanguage');
        data.TypeOfElementClass = function() {
          if (data.element === "Title") {
            return "title-class";
          } else {
            return "text-class";
          }
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

      OriginalPageView.prototype.itemViewOptions = function() {
        var language;
        language = Marionette.getOption(this, 'language');
        return {
          originalLanguage: language
        };
      };

      return OriginalPageView;

    })(Marionette.CompositeView);
  });
});
