var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Logo.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.LogoView = (function(_super) {
      __extends(LogoView, _super);

      function LogoView() {
        return LogoView.__super__.constructor.apply(this, arguments);
      }

      LogoView.prototype.className = 'logo';

      LogoView.prototype.template = '<a href="{{SITEURL}}"><img src="{{url}}" alt="{{title}}"/></a>';

      LogoView.prototype.events = {
        'click': function(e) {
          return e.stopPropagation();
        },
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      return LogoView;

    })(Marionette.ItemView);
  });
});
