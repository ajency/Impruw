var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/seo/templates/view.html'], function(App, formTpl) {
  return App.module('SeoApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
    return View.SeoView = (function(_super) {
      __extends(SeoView, _super);

      function SeoView() {
        return SeoView.__super__.constructor.apply(this, arguments);
      }

      SeoView.prototype.template = formTpl;

      SeoView.prototype.className = 'seo-container';

      return SeoView;

    })(Marionette.ItemView);
  });
});
