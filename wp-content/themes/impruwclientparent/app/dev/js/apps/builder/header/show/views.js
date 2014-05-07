var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/header/show/templates/mainview.html'], function(App, mainviewTpl) {
  return App.module('HeaderApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    var emptyitemview;
    emptyitemview = (function(_super) {
      __extends(emptyitemview, _super);

      function emptyitemview() {
        return emptyitemview.__super__.constructor.apply(this, arguments);
      }

      return emptyitemview;

    })(Marionette.ItemView);
    return Views.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'navbar navbar-default';

      MainView.prototype.itemView = emptyitemview;

      MainView.prototype.serializeData = function() {
        var data;
        data = MainView.__super__.serializeData.call(this);
        console.log(this.collection);
        data.LOGOUTURL = LOGOUTURL;
        data.DASHBOARDURL = DASHBOARDURL;
        return data;
      };

      MainView.prototype.events = {
        'click .add-new-page': function() {
          return this.trigger("add:new:page:clicked");
        },
        'click .color-set': function() {
          return console.log('hi');
        }
      };

      MainView.prototype.onShow = function() {
        this.$el.find('.dropdown-accordion').on('show.bs.dropdown', function(event) {
          var accordion;
          accordion = $(this).find($(this).data('accordion'));
          return accordion.find('.panel-collapse.in').collapse('hide');
        });
        return this.$el.find('.dropdown-accordion').on('click', 'a[data-toggle="collapse"]', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $($(this).data('parent')).find('.panel-collapse.in').collapse('hide');
          return $($(this).attr('href')).collapse('show');
        });
      };

      return MainView;

    })(Marionette.CompositeView);
  });
});
