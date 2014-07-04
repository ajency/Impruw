var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps//language-translation/language-page-content/translated-page-content/templates/translatedpageview.html'], function(App, translatedpageviewTpl) {
  return App.module('LanguageApp.LanguagePageContent.TranslatedPage.Views', function(Views, App, Backbone, Marionette, $, _) {
    var TranslatedPageItemView;
    TranslatedPageItemView = (function(_super) {
      __extends(TranslatedPageItemView, _super);

      function TranslatedPageItemView() {
        return TranslatedPageItemView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPageItemView.prototype.tagName = 'div';

      TranslatedPageItemView.prototype.className = '.form-group.legend-group';

      TranslatedPageItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group"> <div class="col-sm-10"> <textarea type="text" class="form-control">{{content}}</textarea> </div> <div> <button class="btn btn-xs aj-imp-orange-btn"  id="btn-save-translated-element"> Save </button> </div> </div> </div>';

      return TranslatedPageItemView;

    })(Marionette.ItemView);
    return Views.TranslatedPageView = (function(_super) {
      __extends(TranslatedPageView, _super);

      function TranslatedPageView() {
        return TranslatedPageView.__super__.constructor.apply(this, arguments);
      }

      TranslatedPageView.prototype.template = translatedpageviewTpl;

      TranslatedPageView.prototype.itemView = TranslatedPageItemView;

      TranslatedPageView.prototype.itemViewContainer = '#translated-page-elements';

      TranslatedPageView.prototype.events = {
        "click #btn-save-translated-page-title": "updatePageTitle"
      };

      TranslatedPageView.prototype.updatePageTitle = function(e) {
        var newPageTitle, pageId;
        e.preventDefault();
        newPageTitle = this.$el.find('#translated-page-title').val();
        pageId = this.$el.find('#translated-page-id').val();
        return this.trigger("translated:page:title:updated", newPageTitle, pageId);
      };

      return TranslatedPageView;

    })(Marionette.CompositeView);
  });
});
