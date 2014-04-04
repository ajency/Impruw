var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/header/show/templates/mainview.html'], function(App, mainviewTpl) {
  return App.module('HeaderApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SinglePageView;
    SinglePageView = (function(_super) {
      __extends(SinglePageView, _super);

      function SinglePageView() {
        return SinglePageView.__super__.constructor.apply(this, arguments);
      }

      SinglePageView.prototype.template = '';

      SinglePageView.prototype.tagName = 'option';

      SinglePageView.prototype.onRender = function() {
        this.$el.attr('value', this.model.get('ID'));
        return this.$el.text(this.model.get('post_title'));
      };

      return SinglePageView;

    })(Marionette.ItemView);
    return Views.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.itemView = SinglePageView;

      MainView.prototype.itemViewContainer = 'select#aj-imp-page-sel';

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
        'change select#aj-imp-page-sel': function(evt) {
          return this.trigger('editable:page:changed', $(evt.target).val());
        },
        'click .add-new-page': function() {
          return this.trigger("add:new:page:clicked");
        }
      };

      MainView.prototype.onShow = function() {
        this.$el.find('select#aj-imp-page-sel').val(App.request("get:current:editable:page"));
        return this.$el.find('select#aj-imp-page-sel').selectpicker({
          style: 'btn-mini btn-default',
          menuStyle: 'dropdown'
        });
      };

      MainView.prototype.getCurrentPageName = function() {
        var name, pageId;
        pageId = this.$el.find('select#aj-imp-page-sel').val();
        name = this.$el.find('select#aj-imp-page-sel').find("option[value='" + pageId + "']").text();
        return name;
      };

      return MainView;

    })(Marionette.CompositeView);
  });
});
