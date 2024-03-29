var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/elements/contactform/templates/contactform.html'], function(App, contactformTpl) {
  return App.module('SiteBuilderApp.Element.ContactForm.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.ContactFormView = (function(_super) {
      __extends(ContactFormView, _super);

      function ContactFormView() {
        return ContactFormView.__super__.constructor.apply(this, arguments);
      }

      ContactFormView.prototype.className = 'contactform';

      ContactFormView.prototype.template = contactformTpl;

      ContactFormView.prototype.onBeforeRender = function() {
        return this.className += " " + Marionette.getOption(this, 'clsName');
      };

      ContactFormView.prototype.onShow = function() {
        var clsName;
        clsName = Marionette.getOption(this, 'clsName');
        return this.$el.addClass(clsName);
      };

      return ContactFormView;

    })(Marionette.ItemView);
  });
});
