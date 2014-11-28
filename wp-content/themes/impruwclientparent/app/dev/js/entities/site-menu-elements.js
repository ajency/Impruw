var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.SiteMenuElements", function(SiteMenuElements, App, Backbone, Marionette, $, _) {
    var API, menuElementModel;
    SiteMenuElements.MenuElementModel = (function(_super) {
      __extends(MenuElementModel, _super);

      function MenuElementModel() {
        return MenuElementModel.__super__.constructor.apply(this, arguments);
      }

      MenuElementModel.prototype.name = 'menuElement';

      MenuElementModel.prototype.idAttribute = 'term_id';

      return MenuElementModel;

    })(Backbone.Model);
    SiteMenuElements.SiteMenuElementCollection = (function(_super) {
      __extends(SiteMenuElementCollection, _super);

      function SiteMenuElementCollection() {
        return SiteMenuElementCollection.__super__.constructor.apply(this, arguments);
      }

      SiteMenuElementCollection.prototype.model = SiteMenuElements.MenuElementModel;

      SiteMenuElementCollection.prototype.url = function() {
        return AJAXURL + '?action=get-site-menu-elements';
      };

      return SiteMenuElementCollection;

    })(Backbone.Collection);
    menuElementModel = new SiteMenuElements.MenuElementModel;
    API = {
      getSiteMenuElements: function(language) {
        var menuCollection;
        menuCollection = new SiteMenuElements.SiteMenuElementCollection;
        menuCollection.fetch({
          data: {
            language: language
          }
        });
        return menuCollection;
      }
    };
    return App.reqres.setHandler("get:site:menu:elements", function(language) {
      return API.getSiteMenuElements(language);
    });
  });
});
