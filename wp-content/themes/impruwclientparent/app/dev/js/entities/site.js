var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Site", function(Site, App, Backbone, Marionette, $, _) {
    var API, SiteModel, SiteSocialItem, SiteSocialItemsCollection;
    SiteModel = (function(_super) {
      __extends(SiteModel, _super);

      function SiteModel() {
        return SiteModel.__super__.constructor.apply(this, arguments);
      }

      SiteModel.prototype.idAttribute = 'site_id';

      SiteModel.prototype.name = 'site';

      return SiteModel;

    })(Backbone.Model);
    SiteSocialItem = (function(_super) {
      __extends(SiteSocialItem, _super);

      function SiteSocialItem() {
        return SiteSocialItem.__super__.constructor.apply(this, arguments);
      }

      SiteSocialItem.prototype.idAttribute = 'socialname';

      return SiteSocialItem;

    })(Backbone.Model);
    SiteSocialItemsCollection = (function(_super) {
      __extends(SiteSocialItemsCollection, _super);

      function SiteSocialItemsCollection() {
        return SiteSocialItemsCollection.__super__.constructor.apply(this, arguments);
      }

      SiteSocialItemsCollection.prototype.model = SiteSocialItem;

      SiteSocialItemsCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=get-site-socials";
      };

      return SiteSocialItemsCollection;

    })(Backbone.Collection);
    API = {
      getSiteProfile: function() {
        var site;
        site = new SiteModel;
        site.url = AJAXURL + '?action=get-site-profile';
        site.fetch();
        return site;
      },
      getSiteSocial: function() {
        var socialCollection;
        socialCollection = App.request("get:collection", 'socialcollection');
        if (!socialCollection) {
          socialCollection = new SiteSocialItemsCollection;
        }
        if (socialCollection.length === 0) {
          socialCollection.fetch();
        }
        return socialCollection;
      },
      createSocialStoreCollection: function() {
        var socialCollection;
        socialCollection = new SiteSocialItemsCollection;
        return App.request("set:collection", 'socialcollection', socialCollection);
      }
    };
    App.reqres.setHandler("get:site:profile", function() {
      return API.getSiteProfile();
    });
    App.reqres.setHandler("get:site:social", function() {
      return API.getSiteSocial();
    });
    return App.commands.setHandler("create:social:store", function() {
      return API.createSocialStoreCollection();
    });
  });
});
