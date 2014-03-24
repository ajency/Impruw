var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/site-profile/edit/templates/mainview.html', 'text!apps/site-profile/edit/templates/siteprofile.html'], function(App, mainviewTpl, siteprofileTpl) {
  return App.module('SiteProfileApp.Edit.View', function(View, App, Backbone, Marionette, $, _) {
    return View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.events = {
        'click #btn_savesitedetails': function() {
          return this.trigger("save:site:profile", Backbone.Syphon.serialize(this));
        },
        'click .fileinput-new': function() {
          return this.trigger("show:media:manager");
        }
      };

      MainView.prototype.onShow = function() {
        this.$el.find('select').selectpicker();
        this.$el.find('*[data-spy="affix"]').width(this.$el.width());
        return this.$el.find('*[data-spy="affix"]').affix();
      };

      MainView.prototype.onSiteProfileAdded = function() {
        this.$el.find('#form-siteprofile').prepend('<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Save successfully</div>');
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      MainView.prototype.onSetLogo = function(media) {
        return console.log(media);
      };

      return MainView;

    })(Marionette.ItemView);
  });
});
