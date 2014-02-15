// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], function(App, AppController) {
    return App.module("MenuManager.Show", function(Show, App) {
      var _ref;
      return Show.Controller = (function(_super) {
        __extends(Controller, _super);

        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Controller.prototype.initialize = function() {
          var menuCollection, view;
          menuCollection = App.request("get:collection", 'menucollection');
          if (!menuCollection) {
            menuCollection = App.request("get:site:menus");
          }
          view = this.getView(menuCollection);
          return this.show(view, {
            loading: true
          });
        };

        Controller.prototype.getView = function(menuCollection) {
          return new Show.Views.MenuManagerView({
            collection: menuCollection
          });
        };

        return Controller;

      })(AppController);
    });
  });

}).call(this);
