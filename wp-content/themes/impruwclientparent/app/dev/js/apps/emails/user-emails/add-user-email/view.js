var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.UserEmails.AddUserEmail.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.AddUserEmailView = (function(_super) {
      __extends(AddUserEmailView, _super);

      function AddUserEmailView() {
        return AddUserEmailView.__super__.constructor.apply(this, arguments);
      }

      AddUserEmailView.prototype.tagName = 'form';

      AddUserEmailView.prototype.className = 'form-horizontal';

      AddUserEmailView.prototype.template = '<div class="form-group"> <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-emailid" name="emailId" type="text" value="{{emailId}}" class="form-control"> </div> </div> <div class="form-group"> <label for="email-firstName" class="col-sm-3 control-label">{{#polyglot}}First name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-firstName" name="firstName" type="text" value="{{firstName}}" class="form-control"> </div> </div> <div class="form-group"> <label for="email-lastName" class="col-sm-3 control-label">{{#polyglot}}Last name:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-lastName" name="lastName" type="text" value="{{lastName}}" class="form-control"> </div> </div> <div class="form-group"> <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Password:{{/polyglot}}</label> <div class="col-sm-9 col-sm-offset-3"> <input id="email-password" name="password" type="password" value="{{password}}" class="form-control"> </div> </div> <div class="form-group"> <div class="col-sm-9 col-sm-offset-3"> <button class="btn btn-sm aj-imp-orange-btn js-add-user-submit">{{#polyglot}}Add User{{/polyglot}}</button> </div> </div>';

      AddUserEmailView.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Add a User'),
        modal_size: 'small-modal'
      };

      AddUserEmailView.prototype.events = {
        'click .js-add-user-submit': function(e) {
          var data;
          e.preventDefault();
          if (this.$el.valid()) {
            data = Backbone.Syphon.serialize(this);
            console.log(data);
            return this.trigger("add:user:email", data);
          }
        }
      };

      return AddUserEmailView;

    })(Marionette.ItemView);
  });
});
