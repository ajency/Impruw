var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.SiteAddOns", function(SiteAddOns, App, Backbone, Marionette, $, _) {
    var API, siteAddOns;
    SiteAddOns.SiteAddOnModel = (function(_super) {
      __extends(SiteAddOnModel, _super);

      function SiteAddOnModel() {
        return SiteAddOnModel.__super__.constructor.apply(this, arguments);
      }

      SiteAddOnModel.prototype.name = 'siteaddons';

      SiteAddOnModel.prototype.idAttribute = 'element';

      return SiteAddOnModel;

    })(Backbone.Model);
    SiteAddOns.SiteAddOnsCollection = (function(_super) {
      __extends(SiteAddOnsCollection, _super);

      function SiteAddOnsCollection() {
        return SiteAddOnsCollection.__super__.constructor.apply(this, arguments);
      }

      SiteAddOnsCollection.prototype.model = SiteAddOns.SiteAddOnModel;

      SiteAddOnsCollection.prototype.url = function() {
        return AJAXURL + '?action=get-site-addons';
      };

      return SiteAddOnsCollection;

    })(Backbone.Collection);
    siteAddOns = new SiteAddOns.SiteAddOnsCollection;
    API = {
      getSiteAddOns: function() {
        siteAddOns.fetch();
        return siteAddOns;
      },
      getSelectedSiteAddOns: function() {
        var selectedSiteAddOns, siteaddons;
        siteaddons = this.getSiteAddOns();
        selectedSiteAddOns = new SiteAddOns.SiteAddOnsCollection;
        selectedSiteAddOns.set(siteaddons.where({
          'selectStatus': true
        }));
        return selectedSiteAddOns;
      }
    };
    App.reqres.setHandler("get:all:site:addons", function() {
      return API.getSiteAddOns();
    });
    return App.reqres.setHandler("get:selected:site:addons", function() {
      return API.getSelectedSiteAddOns();
    });
  });
});
