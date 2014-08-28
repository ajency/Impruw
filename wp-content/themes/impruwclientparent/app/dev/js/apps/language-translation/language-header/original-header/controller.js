var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-header/original-header/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageHeaderContent.OriginalHeader', function(OriginalHeader, App, Backbone, Marionette, $, _) {
    OriginalHeader.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.headerElementsCollection = App.request("get:header:elements");
        this.originalHeaderView = this._getHeaderView(this.headerElementsCollection);
        return this.show(this.originalHeaderView, {
          loading: true
        });
      };

      Controller.prototype._getHeaderView = function(collection) {
        return new OriginalHeader.Views.OriginalHeaderView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:header:app", function(opts) {
      return new OriginalHeader.Controller(opts);
    });
  });
});
