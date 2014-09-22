var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/seo/templates/seo-page-view.html'], function(App, seoPageTpl) {
  return App.module('SeoApp.SeoPageContent.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.SeoPageContentView = (function(_super) {
      __extends(SeoPageContentView, _super);

      function SeoPageContentView() {
        return SeoPageContentView.__super__.constructor.apply(this, arguments);
      }

      SeoPageContentView.prototype.template = seoPageTpl;

      SeoPageContentView.prototype.className = 'tab-content';

      SeoPageContentView.prototype.events = {
        "click #btn-save-seo-details": 'saveSeoPageDetails'
      };

      SeoPageContentView.prototype.saveSeoPageDetails = function(e) {
        var includeSiteMap, includeSiteMapCheckbox, newSeoDesc, newSeoKeywords, newSeoTitle;
        e.preventDefault();
        newSeoTitle = $("#seo_title").val();
        newSeoDesc = $("#seo_meta_description").val();
        newSeoKeywords = $("#seo_meta_keywords").val();
        includeSiteMapCheckbox = this.$el.find("input[type='checkbox']");
        if (includeSiteMapCheckbox.is(":checked")) {
          includeSiteMap = true;
        } else {
          includeSiteMap = false;
        }
        return this.trigger("page:seo:save", newSeoTitle, newSeoDesc, newSeoKeywords, includeSiteMap);
      };

      SeoPageContentView.prototype.onPageSeoUpdated = function() {
        this.$el.find('.alert').remove();
        this.$el.append('<div class="alert alert-success">' + _.polyglot.t("Page Seo Details updated") + '</div>');
        return this.$el.find('.alert').fadeOut(5000);
      };

      return SeoPageContentView;

    })(Marionette.ItemView);
  });
});
