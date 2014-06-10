var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], function(App, AppController) {
  return App.module("MenuManager.Show", function(Show, App) {
    return Show.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        var menuCollection, view;
        menuCollection = App.request("get:site:menus");
        view = this.getView(menuCollection);
        this.listenTo(view, 'itemview:menu:order:changed', function(iv, order) {
          var newOrder;
          console.log(order);
          newOrder = _.idOrder(order);
          console.log(newOrder);
          console.log(iv);
          return iv.model.get('menu_items').updateOrder(newOrder, iv.model.get('id'));
        });
        this.listenTo(view, "itemview:new:menu:item:added", function(iv, data) {
          var items, menu, menuitem;
          menuitem = App.request("create:new:menu:item", data, data['menu_id']);
          menu = menuCollection.get(parseInt(data['menu_id']));
          items = menu.get('menu_items');
          return items.add(menuitem);
        });
        this.listenTo(App.vent, "itemview:update:menu:item", function(menuItem, newData) {
          return App.execute("update:menu:item", menuItem, newData);
        });
        this.show(view, {
          loading: true
        });
        return App.getRegion('elementsBoxRegion').hide();
      };

      Controller.prototype.onClose = function() {
        App.navigate('');
        return App.getRegion('elementsBoxRegion').unhide();
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
