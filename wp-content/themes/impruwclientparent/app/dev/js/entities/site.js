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
        siteModel = new SiteModel;
        siteModel.fetch({
          data: {
            'action': 'read-language-based-site'
          }
        });
        return siteModel;
      },
      getLanguageBasedSite: function(language) {
        var siteModelByLang;
        siteModelByLang = new SiteModel;
        siteModelByLang.fetch({
          data: {
            'language': language,
            'action': 'read-language-based-site'
          }
        });
        return siteModelByLang;
      },
      getSiteSocial: function() {
        return new Backbone.Collection([
          {
            sociallink: '#facebook',
            socialname: 'facebook'
          }, {
            sociallink: '#twitter',
            socialname: 'twitter'
          }
        ]);
      },
      updateSiteFeatureCount: function(siteid, feature_component, plus_minus) {
        var options, url;
        url = SITEURL + '/api/ajbilling/site_feature_count/' + siteid + '/site/' + feature_component + '/' + plus_minus;
        options = {
          method: 'PUT',
          url: url
        };
        return $.ajax(options).done((function(_this) {
          return function(response) {
            var feature_count, new_feature_count;
            new_feature_count = response.updated_feature_count;
            feature_count = window.PLAN_FEATURE_COUNT;
            feature_count[feature_component][0]['current_count'] = new_feature_count;
            return window.PLAN_FEATURE_COUNT = feature_count;
          };
        })(this));
      },
      getSiteProfile: function() {}
    };
    App.reqres.setHandler("get:site:model", function() {
      return API.getSiteModel();
    });
    App.reqres.setHandler("get:language:based:site", function(language) {
      return API.getLanguageBasedSite(language);
    });
    App.reqres.setHandler("get:site:social", function() {
      return API.getSiteSocial();
    });
    App.reqres.setHandler("get:site:profile", function() {
      return API.getSiteProfile();
    });
    return App.reqres.setHandler("update:site:feature:count", function(siteid, feature_component, plus_minus) {
      return API.updateSiteFeatureCount(siteid, feature_component, plus_minus);
    });
  });
});
