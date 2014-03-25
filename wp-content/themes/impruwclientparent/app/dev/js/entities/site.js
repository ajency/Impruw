var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Site", function(Site, App, Backbone, Marionette, $, _) {
    var API, SiteModel, siteModel;
    SiteModel = (function(_super) {
      __extends(SiteModel, _super);

      function SiteModel() {
        return SiteModel.__super__.constructor.apply(this, arguments);
      }

      SiteModel.prototype.idAttribute = 'site_id';

      SiteModel.prototype.name = 'site';

      return SiteModel;

    })(Backbone.Model);
    siteModel = new SiteModel;
    API = {
      getSiteModel: function() {
        return siteModel;
      },
      getSiteSocial: function() {
        return new Backbone.Collection([
          {
            sociallink: '#facebook',
            socialname: 'facebook'
          }, {
            sociallink: '#twitter',
            socialname: 'twitter'
          }, {
            sociallink: '#youtube',
            socialname: 'youtube'
          }
        ]);
      },
      getSiteProfile: function() {}
    };
    App.reqres.setHandler("get:site:model", function() {
      return API.getSiteModel();
    });
    App.reqres.setHandler("get:site:social", function() {
      return API.getSiteSocial();
    });
    return App.reqres.setHandler("get:site:profile", function() {
      return API.getSiteProfile();
    });
  });
});
