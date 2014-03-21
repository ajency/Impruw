var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'text!apps/leftnav/show/templates/leftNav.html', 'text!apps/leftnav/show/templates/menuitem.html'], function(App, leftNavTpl, menuitemTpl) {
  return App.module('LeftNav.Show.View', function(View, App, Backbone, Marionette, $, _) {
    var MenuItem;
    MenuItem = (function(_super) {
      __extends(MenuItem, _super);

      function MenuItem() {
        return MenuItem.__super__.constructor.apply(this, arguments);
      }

      MenuItem.prototype.template = menuitemTpl;

      MenuItem.prototype.serializeData = function() {
        var data;
        data = this.model.toJSON();
        data.slug = function() {
          return _.slugify(this.title);
        };
        return data;
      };

      return MenuItem;

    })(Marionette.ItemView);
    return View.LeftNav = (function(_super) {
      __extends(LeftNav, _super);

      function LeftNav() {
        this.onSetActiveMenu = __bind(this.onSetActiveMenu, this);
        return LeftNav.__super__.constructor.apply(this, arguments);
      }

      LeftNav.prototype.template = leftNavTpl;

      LeftNav.prototype.itemViewContainer = '#aj-imp-dash-menu';

      LeftNav.prototype.itemView = MenuItem;

      LeftNav.prototype.onShow = function() {
        var hash;
        hash = location.hash;
        hash = hash.replace('#', '');
        return this.onSetActiveMenu(hash);
      };

      LeftNav.prototype.onSetActiveMenu = function(link) {
        this.$el.find("li").removeClass('active');
        link = '#' + link;
        return this.$el.find("a[data-route='" + link + "']").parent().addClass('active');
      };

      return LeftNav;

    })(Marionette.CompositeView);
  });
});
