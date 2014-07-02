var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], function(App, AppController) {
  return App.module("MenuManager.List", function(List, App) {
    List.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.updatedSuccess = __bind(this.updatedSuccess, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var menucollection, view;
        this.menucollection = menucollection = opts.collection;
        this.view = view = this._getView(menucollection);
        this.listenTo(this.view, "itemview:update:menu:item:clicked", (function(_this) {
          return function(iv, formdata, model) {
            return model.save(formdata, {
              wait: true,
              success: _this.updatedSuccess
            });
          };
        })(this));
        this.listenTo(this.menucollection, 'add remove', (function(_this) {
          return function() {
            return _this.view.triggerMethod('triggerOrderChange');
          };
        })(this));
        this.listenTo(this.view, "itemview:delete:menu:item:clicked", (function(_this) {
          return function(iv, model) {
            return _this.region.trigger("delete:menu:item:model", model);
          };
        })(this));
        this.listenTo(this.view, "view:menu:order:changed", (function(_this) {
          return function(order, collection) {
            return _this.region.trigger("menu:order:changed", order, collection);
          };
        })(this));
        return this.show(this.view);
      };

      Controller.prototype._getView = function(menucollection) {
        return new List.Views.MenuCollectionView({
          collection: menucollection
        });
      };

      Controller.prototype.updatedSuccess = function() {
        return this.view.triggerMethod("menu:item:updated");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("list:menu:items:app", function(opts) {
      return new List.Controller(opts);
    });
  });
});
