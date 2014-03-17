var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/site-profile/edit/templates/mainview.html', 'text!apps/site-profile/edit/templates/siteprofile.html'], function(App, mainviewTpl, siteprofileTpl) {
  App.module('SiteProfileApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    View.SiteProfile = (function(_super) {
      __extends(SiteProfile, _super);

      function SiteProfile() {
        return SiteProfile.__super__.constructor.apply(this, arguments);
      }

      SiteProfile.prototype.template = siteprofileTpl;

      SiteProfile.prototype.events = {
        'click .save-site-profile': function() {
          return this.triggers("save:site:profile");
        }
      };

      return SiteProfile;

    })(Marionette.ItemView);
    return View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      return MainView;

    })(Marionette.ItemView);
  });
  return App.SiteProfileApp.Edit.View;
});
