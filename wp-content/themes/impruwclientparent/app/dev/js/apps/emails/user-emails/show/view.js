var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('EmailsApp.UserEmails.Views', function(Views, App, Backbone, Marionette, $, _) {
    var UserEmailItemView;
    UserEmailItemView = (function(_super) {
      __extends(UserEmailItemView, _super);

      function UserEmailItemView() {
        return UserEmailItemView.__super__.constructor.apply(this, arguments);
      }

      UserEmailItemView.prototype.tagName = 'tr';

      UserEmailItemView.prototype.template = '<td>johndoe@mycompany.com</td> <td>John</td> <td>Doe</td> <td>24/9/2014</td> <td class="action-links"> <a class="blue-link" href="#"><span class="icon icon-edit"></span>&nbsp;Edit</a> <a class="orange-link" href="#"><span class="icon icon-blocked"></span>&nbsp;Suspend</a> <a class="red-link" href="#"><span class="icon icon-trashcan"></span>&nbsp;Delete</a> </td>';

      return UserEmailItemView;

    })(Marionette.ItemView);
    return Views.UserEmailView = (function(_super) {
      __extends(UserEmailView, _super);

      function UserEmailView() {
        return UserEmailView.__super__.constructor.apply(this, arguments);
      }

      UserEmailView.prototype.template = '<div class="tab-content"> <div id="users" class="tab-pane active"> <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto 10 company email accounts{{/polyglot}}</h6> <div class="table-responsive"> <table class="table table-striped table-bordered table-hover"> <thead> <tr> <th>{{#polyglot}}Email Address{{/polyglot}}</th> <th>{{#polyglot}}First Name{{/polyglot}}</th> <th>{{#polyglot}}Last Name{{/polyglot}}</th> <th>{{#polyglot}}Date Created{{/polyglot}}</th> <th>{{#polyglot}}Actions{{/polyglot}}</th> </tr> </thead> <tbody> </tbody> </table> </div> <div class="actions"> <button class="btn btn-sm aj-imp-orange-btn" id="add-new-user-email-btn"> <span class="glyphicon glyphicon-user"></span>&nbsp;{{#polyglot}}Add User{{/polyglot}} </button> </div> </div> </div> ';

      UserEmailView.prototype.itemView = UserEmailItemView;

      UserEmailView.prototype.itemViewContainer = 'tbody';

      UserEmailView.prototype.events = {
        'click #add-new-user-email-btn': 'addNewUserEmail'
      };

      UserEmailView.prototype.addNewUserEmail = function(e) {
        e.preventDefault();
        return this.trigger("add:new:user:email");
      };

      return UserEmailView;

    })(Marionette.CompositeView);
  });
});
