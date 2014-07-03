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
        data.title = _.polyglot.t(this.model.get('title'));
        return data;
      };

      MenuItem.prototype.onShow = function() {
        var submenu, submenuTpl;
        submenu = this.model.get('submenu');
        if (!_.isUndefined(submenu)) {
          submenuTpl = this.getSubmenuTpl(submenu);
          return this.$el.find('.aj-imp-nav-create').append('<ul class="sub-menu">' + submenuTpl + '</ul>');
        }
      };

      MenuItem.prototype.events = {
        'click': function() {
          var linkName;
          linkName = this.$el.find('a').attr('href');
          if (linkName === '#/logout') {
            return this.trigger("logout:clicked");
          }
        }
      };

      MenuItem.prototype.getSubmenuTpl = function(submenu) {
        this.submenuTpl = " ";
        _.each(submenu, (function(_this) {
          return function(submenuData, index) {
            var submenuIcon, submenuLink, submenuTitle;
            submenuLink = submenuData.url;
            submenuTitle = _.polyglot.t(submenuData.title);
            submenuIcon = submenuData.icon;
            return _this.submenuTpl += "<li> <a href='" + submenuLink + "' data-route='#" + submenuLink + "'>" + submenuTitle + "</a> </li>";
          };
        })(this));
        return this.submenuTpl;
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

      LeftNav.prototype.serializeData = function() {
        var data;
        data = LeftNav.__super__.serializeData.call(this);
        data.SITEURL = SITEURL;
        return data;
      };

      LeftNav.prototype.onShow = function() {
        var hash, jPM;
        hash = location.hash;
        hash = hash.replace('#', '');
        this.onSetActiveMenu(hash);
        jPM = $.jPanelMenu({
          menu: '.aj-imp-dash-nav',
          trigger: '#nav-trigger'
        });
        return jPM.on();
      };

      LeftNav.prototype.onSetActiveMenu = function(link) {
        var jPM;
        this.$el.find("li").removeClass('active');
        link = '#/' + link;
        this.$el.find("a[data-route='" + link + "']").parent().addClass('active');
        jPM = $.jPanelMenu();
        return jPM.close();
      };

      return LeftNav;

    })(Marionette.CompositeView);
  });
});
