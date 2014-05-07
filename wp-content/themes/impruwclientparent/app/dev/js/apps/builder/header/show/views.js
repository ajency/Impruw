var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/header/show/templates/mainview.html'], function(App, mainviewTpl) {
  return App.module('HeaderApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, SingleSetView, ThemeColorSetView;
    Views.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'navbar navbar-default';

      MainView.prototype.serializeData = function() {
        var data;
        data = MainView.__super__.serializeData.call(this);
        data.LOGOUTURL = LOGOUTURL;
        data.DASHBOARDURL = DASHBOARDURL;
        return data;
      };

      MainView.prototype.events = {
        'click .add-new-page': function() {
          return this.trigger("add:new:page:clicked");
        }
      };

      MainView.prototype.onShow = function() {
        this.$el.find('.dropdown-accordion').on('show.bs.dropdown', (function(_this) {
          return function(event) {
            var accordion;
            accordion = $(_this).find($(_this).data('accordion'));
            accordion.find('.panel-collapse.in').collapse('hide');
            return _this.trigger("get:theme:set:colors");
          };
        })(this));
        return this.$el.find('.dropdown-accordion').on('click', 'a[data-toggle="collapse"]', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $($(this).data('parent')).find('.panel-collapse.in').collapse('hide');
          return $($(this).attr('href')).collapse('show');
        });
      };

      MainView.prototype.onAddThemeColorSets = function(themeColorCollection) {
        var themeColorView;
        themeColorView = new ThemeColorSetView({
          collection: themeColorCollection
        });
        themeColorView.render();
        this.$el.find('.dropdown-accordion').append(themeColorView.$el);
        return this.listenTo(themeColorView, "itemview:change:theme:color:clicked", this.changeThemeColorClick);
      };

      MainView.prototype.changeThemeColorClick = function(iv, model) {
        return this.trigger("change:theme:color", model);
      };

      return MainView;

    })(Marionette.Layout);
    SingleSetView = (function(_super) {
      __extends(SingleSetView, _super);

      function SingleSetView() {
        return SingleSetView.__super__.constructor.apply(this, arguments);
      }

      SingleSetView.prototype.tagName = 'li';

      SingleSetView.prototype.template = '<div class="drilldown"> <div class="drilldown-container"> <div class="drilldown-root"> <div class="color-set clearfix active "> <a href="#" class="change-theme-color">{{name}} <span class="bicon icon-uniF176"></span></a> </div> </div> </div> </div>';

      SingleSetView.prototype.events = {
        'click .change-theme-color': function() {
          return this.trigger("change:theme:color:clicked", this.model);
        }
      };

      return SingleSetView;

    })(Marionette.ItemView);
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.tagName = 'li';

      EmptyView.prototype.template = 'Nothing found';

      return EmptyView;

    })(Marionette.ItemView);
    return ThemeColorSetView = (function(_super) {
      __extends(ThemeColorSetView, _super);

      function ThemeColorSetView() {
        return ThemeColorSetView.__super__.constructor.apply(this, arguments);
      }

      ThemeColorSetView.prototype.tagName = 'ul';

      ThemeColorSetView.prototype.itemView = SingleSetView;

      ThemeColorSetView.prototype.emptyView = EmptyView;

      ThemeColorSetView.prototype.className = 'dropdown-menu pull-right';

      return ThemeColorSetView;

    })(Marionette.CollectionView);
  });
});
