var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/emails/show/templates/emailsview.html'], function(App, emailsviewTpl) {
  return App.module('EmailsApp.Show.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.EmailView = (function(_super) {
      __extends(EmailView, _super);

      function EmailView() {
        return EmailView.__super__.constructor.apply(this, arguments);
      }

      EmailView.prototype.template = emailsviewTpl;

      return EmailView;

    })(Marionette.ItemView);
  });
});
