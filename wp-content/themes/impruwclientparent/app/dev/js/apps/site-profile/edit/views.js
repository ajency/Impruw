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
        },
        'click .domain-update': function() {
          var domainName;
          domainName = this.$el.find('#domain-name').val();
          return this.trigger("update:domain:mapping:name", domainName);
        }
      };

      MainView.prototype.serializeData = function() {
        var data;
        data = MainView.__super__.serializeData.call(this);
        data.site_domain = data.site_domain.split('.').shift();
        if (data.logo_url === "") {
          data.logo_url = "http://placehold.it/100&text=" + _.polyglot.t('Logo');
        }
        return data;
      };

      MainView.prototype.onShow = function() {
        var m, subscriptionId, w;
        subscriptionId = this.model.get('braintree_subscription');
        if (subscriptionId === "ImpruwFree" || subscriptionId === null) {
          this.$el.find('#domain-name').attr('readonly', 'readonly');
          this.$el.find('.upgrade').show();
          this.$el.find('.domain-update, .update-help').hide();
        }
        this.$el.find('select').selectpicker();
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        return this.$el.find('*[data-spy="affix"]').css('margin-left', m);
      };

      MainView.prototype.onSiteProfileAdded = function() {
        this.$el.find('.alert').remove();
        this.$el.find('#form-siteprofile').prepend('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + _.polyglot.t("Save successfully") + '</div>');
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };

      MainView.prototype.onSetLogo = function(media) {
        var image_id, image_path, media_size;
        image_id = media.get('id');
        media_size = media.get('sizes');
        image_path = media_size.thumbnail.url;
        this.$el.find('.feature-image').attr('src', image_path);
        return this.$el.find('#logo_id').attr('value', image_id);
      };

      MainView.prototype.onDomainUpdate = function(Msg) {
        this.$el.find('#msg').empty();
        return this.$el.find('#msg').text(Msg);
      };

      return MainView;

    })(Marionette.ItemView);
  });
});
