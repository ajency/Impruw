var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.UserEmails.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyView, UserEmailItemView;
    EmptyView = (function(_super) {
      __extends(EmptyView, _super);

      function EmptyView() {
        return EmptyView.__super__.constructor.apply(this, arguments);
      }

      EmptyView.prototype.className = 'empty-info';

      EmptyView.prototype.tagName = 'tr';

      EmptyView.prototype.template = '<td colspan="5">{{#polyglot}}No Email accounts found{{/polyglot}}</td>';

      return EmptyView;

    })(Marionette.ItemView);
    UserEmailItemView = (function(_super) {
      __extends(UserEmailItemView, _super);

      function UserEmailItemView() {
        return UserEmailItemView.__super__.constructor.apply(this, arguments);
      }

      UserEmailItemView.prototype.tagName = 'tr';

      UserEmailItemView.prototype.template = '<td>{{email}}</td> <td>{{firstName}}</td> <td>{{firstName}}</td> <td>{{dateOfCreation}}</td> <td class="action-links"> <a class="blue-link edit-useremail-link" href="#"><span class="icon icon-edit"></span>&nbsp;Edit</a> <a class="orange-link suspenduseremail_link {{hideSuspend}}" href="#/emails/suspend/{{email}}"><span class="icon icon-blocked"></span>&nbsp;Suspend</a> <a class="red-link deleteuseremail_link" href="#/emails/delete/{{email}}"><span class="icon icon-trashcan "></span>&nbsp;Delete</a> </td>';

      UserEmailItemView.prototype.events = {
        'click .deleteuseremail_link': function(e) {
          var email_id;
          e.preventDefault();
          email_id = this.model.get('email');
          if (confirm(_.polyglot.t("Delete this user email id?"))) {
            return this.trigger("delete:user:email", email_id);
          }
        },
        'click .suspenduseremail_link': function(e) {
          var email_id;
          e.preventDefault();
          email_id = this.model.get('email');
          if (confirm(_.polyglot.t("Suspend this user email id?"))) {
            return this.trigger("disable:user:email", email_id);
          }
        },
        'click .edit-useremail-link': function(e) {
          e.preventDefault();
          return App.execute("show:edit:user:email", {
            model: this.model
          });
        }
      };

      UserEmailItemView.prototype.mixinTemplateHelpers = function(data) {
        data = UserEmailItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.hideSuspend = function() {
          if (data.has_password === "0") {
            return "hide";
          } else {
            return "";
          }
        };
        return data;
      };

      return UserEmailItemView;

    })(Marionette.ItemView);
    return Views.UserEmailView = (function(_super) {
      __extends(UserEmailView, _super);

      function UserEmailView() {
        return UserEmailView.__super__.constructor.apply(this, arguments);
      }

      UserEmailView.prototype.template = '<div class="tab-content"> <div id="users" class="tab-pane active"> <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto 10 company email accounts{{/polyglot}}</h6> <div class="table-responsive"> <table class="table table-striped table-bordered table-hover"> <thead> <tr> <th>{{#polyglot}}Email Address{{/polyglot}}</th> <th>{{#polyglot}}First Name{{/polyglot}}</th> <th>{{#polyglot}}Last Name{{/polyglot}}</th> <th>{{#polyglot}}Date Created{{/polyglot}}</th> <th>{{#polyglot}}Actions{{/polyglot}}</th> </tr> </thead> <tbody> </tbody> </table> </div> <div class="actions"> <button class="btn btn-sm aj-imp-orange-btn" id="add-new-user-email-btn"> <span class="glyphicon glyphicon-user"></span>&nbsp;{{#polyglot}}Add User{{/polyglot}} </button> </div> </div> </div> ';

      UserEmailView.prototype.itemView = UserEmailItemView;

      UserEmailView.prototype.emptyView = EmptyView;

      UserEmailView.prototype.itemViewContainer = 'tbody';

      UserEmailView.prototype.events = {
        'click #add-new-user-email-btn': 'addNewUserEmail'
      };

      UserEmailView.prototype.addNewUserEmail = function(e) {
        e.preventDefault();
        return this.trigger("add:new:user:email");
      };

      UserEmailView.prototype.onSuspendEmail = function() {
        return console.log("Email suspended composite");
      };

      return UserEmailView;

    })(Marionette.CompositeView);
  });
});
