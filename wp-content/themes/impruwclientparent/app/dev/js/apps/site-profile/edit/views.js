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
        'click .fileinput-logo': function() {
          return this.trigger("show:media:manager", 'logo');
        },
        'click .fileinput-favicon .fileinput-preview': function() {
          return this.trigger('show:media:manager', 'favicon');
        },
        'click .domain-update': function() {
          var domainName;
          domainName = this.$el.find('#domain-name').val();
          return this.trigger("update:domain:mapping:name", domainName);
        },
        'click .refresh-map-btn': function() {
          var address;
          address = '';
          if (this.$el.find('input[name="street"]').val() !== '') {
            address += this.$el.find('input[name="street"]').val() + ',';
          }
          if (this.$el.find('input[name="city"]').val() !== '') {
            address += this.$el.find('input[name="city"]').val() + ',';
          }
          if (this.$el.find('input[name="postal_code"]').val() !== '') {
            address += this.$el.find('input[name="postal_code"]').val() + ',';
          }
          address += this.$el.find('select[name="country"]').selectpicker('val');
          return this.trigger('refresh:map:view', address);
        },
        'click .remove-favicon': function(e) {
          e.preventDefault();
          this.$el.find('#favicon_id').attr('value', 0);
          this.$el.find('.site_favicon_images').attr('src', "http://placehold.it/100&text=" + _.polyglot.t('Favicon'));
          return this.$el.find('.remove-favicon').addClass('hide');
        }
      };

      MainView.prototype.serializeData = function() {
        var data, _ref;
        data = MainView.__super__.serializeData.call(this);
        data.site_domain = data.site_domain.split('.').shift();
        if (data.logo_url === "") {
          data.logo_url = "http://placehold.it/100&text=" + _.polyglot.t('Logo');
        }
        if (data.favicon_url === "") {
          data.favicon_url = "http://placehold.it/100&text=" + _.polyglot.t('Favicon');
        }
        data.hideRemove = (_ref = data.favicon_id) === '' || _ref === 0 || _ref === '0' ? "hide" : '';
        return data;
      };

      MainView.prototype.onShow = function() {
        var address, is_domain_mapping_allowed, m, w;
        is_domain_mapping_allowed = this.model.get('domain_mapping_status');
        if (is_domain_mapping_allowed === 0) {
          this.$el.find('#domain-name').attr('readonly', 'readonly');
          this.$el.find('.upgrade').show();
          this.$el.find('.domain-update, .update-help').hide();
        }
        this.$el.find('select').selectpicker();
        this.$el.find('select[name="country"]').selectpicker('val', this.model.get('country')).selectpicker('refresh');
        this.$el.find('*[data-spy="affix"]').affix();
        w = $('.aj-imp-right').width();
        this.$el.find('*[data-spy="affix"]').width(w);
        m = $('.aj-imp-left').width();
        this.$el.find('*[data-spy="affix"]').css('margin-left', m);
        address = this.$el.find('input[name="street"]').val() + ',' + this.$el.find('input[name="city"]').val() + ',' + this.$el.find('input[name="postal_code"]').val() + ',' + this.$el.find('select[name="country"]').selectpicker('val');
        console.log(address);
        return this.trigger('show:map:view', address);
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
        this.$el.find('.site_profile_images').attr('src', image_path);
        return this.$el.find('#logo_id').attr('value', image_id);
      };

      MainView.prototype.onSetFavicon = function(media) {
        var image_id, image_path, media_size;
        image_id = media.get('id');
        media_size = media.get('sizes');
        if (media_size) {
          image_path = media_size.thumbnail.url;
        } else {
          image_path = media.get('url');
        }
        this.$el.find('.site_favicon_images').attr('src', image_path);
        this.$el.find('#favicon_id').attr('value', image_id);
        return this.$el.find('.remove-favicon').removeClass('hide');
      };

      MainView.prototype.onDomainUpdate = function(Msg) {
        this.$el.find('#msg').empty();
        return this.$el.find('#msg').text(Msg);
      };

      MainView.prototype.onShowMap = function(mapView) {
        this.$el.find('.map-region').html(mapView.render().$el);
        return mapView.triggerMethod('show');
      };

      return MainView;

    })(Marionette.ItemView);
  });
});
