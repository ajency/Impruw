var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/leftnav/show/templates/leftNav.html', 'text!apps/leftnav/show/templates/menuitem.html'], function(App, leftNavTpl, menuitemTpl) {
  App.module('LeftNav.Show.View', function(View, App, Backbone, Marionette, $, _) {
    View.MenuItem = (function(_super) {
      __extends(MenuItem, _super);

      function MenuItem() {
        return MenuItem.__super__.constructor.apply(this, arguments);
      }

      MenuItem.prototype.template = menuitemTpl;

      return MenuItem;

    })(Marionette.ItemView);
    return View.LeftNav = (function(_super) {
      __extends(LeftNav, _super);

      function LeftNav() {
        return LeftNav.__super__.constructor.apply(this, arguments);
      }

      LeftNav.prototype.template = leftNavTpl;

      LeftNav.prototype.itemViewContainer = '#aj-imp-dash-menu';

      LeftNav.prototype.itemView = View.MenuItem;

      return LeftNav;

    })(Marionette.CompositeView);
  });
  return App.LeftNav.Show.View;
});
