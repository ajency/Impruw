var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.EmailNav.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.EmailNavView = (function(_super) {
      __extends(EmailNavView, _super);

      function EmailNavView() {
        return EmailNavView.__super__.constructor.apply(this, arguments);
      }

      EmailNavView.prototype.template = '<ul class="nav nav-pills"> <li class="active"> <a data-toggle="tab" href="#users" id="users-emails">{{#polyglot}}Users{{/polyglot}}</a> </li> </ul>';

      EmailNavView.prototype.events = {
        'click a#users-emails': 'loadUserEmails'
      };

      EmailNavView.prototype.onShow = function() {
        return this.trigger("user:email:list");
      };

      EmailNavView.prototype.loadUserEmails = function(e) {
        return this.trigger("user:email:list");
      };

      return EmailNavView;

    })(Marionette.ItemView);
    return Views.EmailDisabledView = (function(_super) {
      __extends(EmailDisabledView, _super);

      function EmailDisabledView() {
        return EmailDisabledView.__super__.constructor.apply(this, arguments);
      }

      EmailDisabledView.prototype.template = '<div class="empty-info">You cannot use the emails feature since your domain name is not updated. Update your domain name by going to Site Profile on the Dashboard. Once you have changed your domain name, you can come back here to add email accounts for that domain.</div>';

      return EmailDisabledView;

    })(Marionette.ItemView);
  });
});
