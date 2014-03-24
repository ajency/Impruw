var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["app", 'backbone'], function(App, Backbone) {
  return App.module("Entities.Packages", function(Packages, App, Backbone, Marionette, $, _) {
    var API, Package, PackageCollection, packageCollection;
    Package = (function(_super) {
      __extends(Package, _super);

      function Package() {
        return Package.__super__.constructor.apply(this, arguments);
      }

      Package.prototype.name = 'package';

      Package.prototype.defaults = function() {
        return {
          package_name: '',
          package_description: ''
        };
      };

      return Package;

    })(Backbone.Model);
    PackageCollection = (function(_super) {
      __extends(PackageCollection, _super);

      function PackageCollection() {
        return PackageCollection.__super__.constructor.apply(this, arguments);
      }

      PackageCollection.prototype.model = Package;

      PackageCollection.prototype.url = function() {
        return "" + AJAXURL + "?action=fetch-packages";
      };

      return PackageCollection;

    })(Backbone.Collection);
    packageCollection = new PackageCollection;
    API = {
      getPackagesCollection: function() {
        packageCollection;
        packageCollection.fetch();
        return packageCollection;
      },
      createPlanModel: function(data) {
        if (data == null) {
          data = {};
        }
        return new Package(data);
      }
    };
    App.reqres.setHandler("get:packages:collection", function() {
      return API.getPackagesCollection();
    });
    return App.reqres.setHandler("create:plan:model", function(data) {
      return API.createPlanModel(data);
    });
  });
});
