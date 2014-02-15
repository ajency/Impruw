// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["app", 'backbone'], function(App, Backbone) {
    return App.module("Entities.Pages", function(Pages, App, Backbone, Marionette, $, _) {
      var API, _ref, _ref1;
      Pages.PageModel = (function(_super) {
        __extends(PageModel, _super);

        function PageModel() {
          _ref = PageModel.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        PageModel.prototype.defaults = function() {
          return {
            post_title: '',
            post_content: ''
          };
        };

        return PageModel;

      })(Backbone.Model);
      Pages.PageCollection = (function(_super) {
        __extends(PageCollection, _super);

        function PageCollection() {
          _ref1 = PageCollection.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        PageCollection.prototype.model = Pages.PageModel;

        PageCollection.prototype.url = function() {
          return "" + AJAXURL + "?action=get-pages";
        };

        PageCollection.prototype.parse = function(resp) {
          if (resp.code === 'OK') {
            return resp.data;
          }
        };

        return PageCollection;

      })(Backbone.Collection);
      API = {
        getPages: function(param) {
          var pages;
          if (param == null) {
            param = {};
          }
          pages = new Pages.PageCollection;
          App.request("set:collection", 'pagecollection', pages);
          pages.fetch({
            reset: true,
            data: param
          });
          return pages;
        }
      };
      return App.reqres.setHandler("get:editable:pages", function() {
        return API.getPages();
      });
    });
  });

}).call(this);
