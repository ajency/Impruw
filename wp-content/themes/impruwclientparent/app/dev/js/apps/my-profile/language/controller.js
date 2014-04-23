var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/my-profile/language/views'], function(App, AppController) {
  return App.module('MyProfileApp.Language', function(Language, App, Backbone, Marionette, $, _) {
    Language.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var model;
        model = opts.model;
        this.model = model;
        this.view = this.getLanguageView(this.model);
        this.listenTo(this.view, "update:user:lang:click", this.updateLanguage);
        return this.show(this.view, {
          loading: true
        });
      };

      Controller.prototype.getLanguageView = function(model) {
        return new Language.View.LanguageForm({
          model: model
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:form", function(opts) {
      return new Language.Controller(opts);
    });
  });
});
