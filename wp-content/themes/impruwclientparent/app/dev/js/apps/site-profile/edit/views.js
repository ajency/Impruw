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

      MainView.prototype.onRender = function() {};

      MainView.prototype.onShow = function() {
        var m, w;
        this.$el.find('select').selectpicker();
        this.$el.find('*[data-spy="affix"]').width(this.$el.width());
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      MainView.prototype.onSiteProfileAdded = function() {
        this.$el.find('#form-siteprofile').prepend('<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> Save successfully</div>');
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      MainView.prototype.onSetLogo = function(media) {
        var image_id, image_path, media_size;
        image_id = media.get('id');
        media_size = media.get('sizes');
        image_path = media_size.full.url;
        console.log(image_path);
        this.$el.find('.site_profile_images').attr('src', image_path);
        return this.$el.find('#logo_id').attr('value', image_id);
      };

      return MainView;

    })(Marionette.ItemView);
  });
});
