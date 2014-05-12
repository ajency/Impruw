var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module("ChooseTheme.Views", function(Views, App) {
    var ThemeView;
    ThemeView = (function(_super) {
      __extends(ThemeView, _super);

      function ThemeView() {
        return ThemeView.__super__.constructor.apply(this, arguments);
      }

      ThemeView.prototype.template = '<img src="{{image_url}}"> <h6 class="desc">{{post_title}}</h6> <div class="aj-imp-choose-btn"> <a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;Choose</a> <a href="{{preview_link}}" target="_BLANK" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> </div>';

      ThemeView.prototype.className = 'block';

      ThemeView.prototype.tagName = 'li';

      ThemeView.prototype.events = {
        'click a.choose-theme': function(e) {
          e.stopPropagation();
          e.preventDefault();
          this.$el.find('.choose-theme').text('Applying...');
          return this.trigger("choose:theme:clicked", this.model);
        }
      };

      return ThemeView;

    })(Marionette.ItemView);
    return Views.ChooseThemeView = (function(_super) {
      __extends(ChooseThemeView, _super);

      function ChooseThemeView() {
        return ChooseThemeView.__super__.constructor.apply(this, arguments);
      }

      ChooseThemeView.prototype.template = '<h2 class="page-title">Choose a Theme for your Site</h2> <p class="desc">You can choose a theme to be applied across the pages of your site, you will be able to customise your theme logo, colours, layout, and components to suit your Site and preferences.</p> <button class="btn btn-danger cancel-theme-switch" type="button">Cancel</button> <div class="aj-imp-block-list"> <ul></ul> </div>';

      ChooseThemeView.prototype.events = {
        'click button.cancel-theme-switch': function() {
          return this.trigger("cancel:theme:switch");
        }
      };

      ChooseThemeView.prototype.className = 'aj-imp-theme-area';

      ChooseThemeView.prototype.itemView = ThemeView;

      ChooseThemeView.prototype.itemViewContainer = '.aj-imp-block-list ul';

      ChooseThemeView.prototype.onShow = function() {
        return $('body').addClass('choose-theme-page');
      };

      ChooseThemeView.prototype.onClose = function() {
        return $('body').removeClass('choose-theme-page');
      };

      return ChooseThemeView;

    })(Marionette.CompositeView);
  });
});
