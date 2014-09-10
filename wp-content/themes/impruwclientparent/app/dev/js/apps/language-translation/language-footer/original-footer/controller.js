var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-footer/original-footer/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageFooterContent.OriginalFooter', function(OriginalFooter, App, Backbone, Marionette, $, _) {
    OriginalFooter.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.footerElementsCollection = App.request("get:footer:elements");
        this.originalFooterView = this._getFooterView(this.footerElementsCollection);
        return this.show(this.originalFooterView, {
          loading: true
        });
      };

      Controller.prototype._getFooterView = function(collection) {
        return new OriginalFooter.Views.OriginalFooterView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:footer:app", function(opts) {
      return new OriginalFooter.Controller(opts);
    });
  });
});
