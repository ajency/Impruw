var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Seo", function(Seo, App, Backbone, Marionette, $, _) {
    var API, SeoModel;
    SeoModel = (function(_super) {
      __extends(SeoModel, _super);

      function SeoModel() {
        return SeoModel.__super__.constructor.apply(this, arguments);
      }

      SeoModel.prototype.idAttribute = 'post_id';

      SeoModel.prototype.name = 'page-seo';

      return SeoModel;

    })(Backbone.Model);
    API = {
      getSeoModel: function(post_id) {
        var seoModel;
        seoModel = new SeoModel({
          'post_id': post_id
        });
        seoModel.fetch();
        return seoModel;
      }
    };
    return App.reqres.setHandler("get:seo:model", function(post_id) {
      return API.getSeoModel(post_id);
    });
  });
});
