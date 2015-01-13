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

      EmptyView.prototype.template = '<td colspan="5">' + _.polyglot.t("no_user_email_accounts", {
        domain_name: DOMAIN_NAME
      }) + '</td>';

      return EmptyView;

    })(Marionette.ItemView);
    UserEmailItemView = (function(_super) {
      __extends(UserEmailItemView, _super);

      function UserEmailItemView() {
        return UserEmailItemView.__super__.constructor.apply(this, arguments);
      }

      UserEmailItemView.prototype.tagName = 'tr';

      UserEmailItemView.prototype.template = '<td>{{email}}</td> <td>{{name}}</td> <td class="action-links"> <a class="blue-link edit-useremail-link" href="#"><span class="icon icon-edit"></span>&nbsp;{{#polyglot}}Edit{{/polyglot}}</a> <a class="red-link deleteuseremail_link" href="#/emails/delete/{{email}}"><span class="icon icon-trashcan "></span>&nbsp;{{#polyglot}}Delete{{/polyglot}}</a> {{#enabled}}<!--a class="orange-link suspenduseremail_link" href="#/emails/suspend/{{email}}"><span class="icon icon-blocked"></span>&nbsp;{{#polyglot}}Disable{{/polyglot}}</a-->{{/enabled}} {{^enabled}}<a class="orange-link enableuseremail_link" href="#/emails/enable/{{email}}"><span class="icon icon-checked"></span>&nbsp;{{#polyglot}}Enable{{/polyglot}}</a>{{/enabled}} </td>';

      UserEmailItemView.prototype.modelEvents = {
        'change': 'render'
      };

      UserEmailItemView.prototype.events = {
        'click .deleteuseremail_link': function(e) {
          var email_id;
          e.preventDefault();
          email_id = this.model.get('email');
          if (confirm(_.polyglot.t("Delete this user email id?"))) {
            return this.trigger("delete:user:email", email_id);
          }
        },
        'click .enableuseremail_link': function(e) {
          var email_id;
          e.preventDefault();
          email_id = this.model.get('email');
          if (confirm(_.polyglot.t("To re-enable email account please, reset the password"))) {
            this.model.set('reenableAccount', 1);
            return App.execute("show:edit:user:email", {
              model: this.model
            });
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
        data.enabled = function() {
          if (data.has_password === "0") {
            return false;
          } else {
            return true;
          }
        };
        return data;
      };

      UserEmailItemView.prototype.onRender = function() {
        var emailIndex;
        emailIndex = Marionette.getOption(this, 'emailIndex');
        if (emailIndex + 1 > PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']) {
          this.$el.closest("tr").find(' .enableuseremail_link').remove();
          return this.$el.closest("tr").hide();
        }
      };

      return UserEmailItemView;

    })(Marionette.ItemView);
    return Views.UserEmailView = (function(_super) {
      __extends(UserEmailView, _super);

      function UserEmailView() {
        return UserEmailView.__super__.constructor.apply(this, arguments);
      }

      UserEmailView.prototype.template = '<div class="tab-content"> <div id="users" class="tab-pane active"> <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto ' + PLAN_FEATURE_COUNT["email_account"][0]["allowed_count"] + ' company email accounts{{/polyglot}}</h6> <div class="table-responsive"> <table class="table table-striped table-bordered table-hover"> <thead> <tr> <th>{{#polyglot}}Email Address{{/polyglot}}</th> <th>{{#polyglot}}Name{{/polyglot}}</th> <th>{{#polyglot}}Actions{{/polyglot}}</th> </tr> </thead> <tbody> </tbody> </table> </div> <div class="actions"> <button class="btn btn-sm aj-imp-orange-btn" id="add-new-user-email-btn"> <span class="glyphicon glyphicon-user"></span>&nbsp;{{#polyglot}}Add User{{/polyglot}} </button> </div> </div> </div> ';

      UserEmailView.prototype.addChildView = function() {};

      UserEmailView.prototype.collectionEvents = {
        "remove": "render",
        "add": "render"
      };

      UserEmailView.prototype.childView = UserEmailItemView;

      UserEmailView.prototype.emptyView = EmptyView;

      UserEmailView.prototype.childViewContainer = 'tbody';

      UserEmailView.prototype.events = {
        'click #add-new-user-email-btn': 'addNewUserEmail'
      };

      UserEmailView.prototype.itemViewOptions = function(model, index) {
        return {
          emailIndex: index
        };
      };

      UserEmailView.prototype.onRender = function() {
        var count_display, msg;
        if (this.collection.length >= PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']) {
          this.$el.find('#add-new-user-email-btn').prop('disabled', true);
        }
        if (PLAN_FEATURE_COUNT['email_account'][0]['allowed_count'] === 99999) {
          count_display = "unlimited";
          msg = _.polyglot.t('Create ' + count_display + ' company email accounts');
          return this.$el.find('#users h6').html(msg);
        }
      };

      UserEmailView.prototype.addNewUserEmail = function(e) {
        e.preventDefault();
        return this.trigger("add:new:user:email");
      };

      UserEmailView.prototype.onSuspendEmail = function(msg) {
        return console.log(msg);
      };

      UserEmailView.prototype.onDeleteEmail = function(msg) {
        return console.log(msg);
      };

      return UserEmailView;

    })(Marionette.CompositeView);
  });
});
