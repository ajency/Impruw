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

      ThemeView.prototype.template = '<img src="{{image_url}}"> <h6 class="desc">{{post_title}}</h6> <div class="aj-imp-choose-btn"> {{^currentTheme}}<a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Choose{{/polyglot}}</a>{{/currentTheme}} <a href="{{preview_link}}" target="_BLANK" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;{{#polyglot}}Preview{{/polyglot}}</a> </div> {{#currentTheme}}<div class="current-wrapper"><div class="current">{{#polyglot}}Current Theme{{/polyglot}}</div></div>{{/currentTheme}}';

      ThemeView.prototype.className = 'block';

      ThemeView.prototype.tagName = 'li';

      ThemeView.prototype.serializeData = function() {
        var data;
        data = ThemeView.__super__.serializeData.call(this);
        data.currentTheme = CURRENTTHEME === data.post_name;
        return data;
      };

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

      ChooseThemeView.prototype.template = '<h2 class="page-title">{{#polyglot}}Choose Site Theme{{/polyglot}}</h2>\n <p class="desc">{{#polyglot}}Theme applied for pages{{/polyglot}}\n    {{#polyglot}}Customise logo colors{{/polyglot}}\n    {{#polyglot}}Suit site preferences{{/polyglot}}</p>\n {{^ISTHEMESELECTED}} <div class="default-language-selection"> <h3 class="lang-title">{{#polyglot}}Choose default Language{{/polyglot}}</h3>\n <select class="select-site-language"> <option value="English">{{#polyglot}}English{{/polyglot}}</option> <option value="Norwegian">{{#polyglot}}Norwegian{{/polyglot}}</option> </select> <button class="btn choose-site-language"><span class="bicon icon-uniF19A"></span>&nbsp;{{#polyglot}}Choose Language{{/polyglot}}</button>\n </div> {{/ISTHEMESELECTED}}\n {{#ISTHEMESELECTED}}\n <button class="btn btn-danger cancel-theme-switch">{{#polyglot}}Cancel{{/polyglot}}</button>\n {{/ISTHEMESELECTED}}\n <div class="aj-imp-block-list {{^ISTHEMESELECTED}}hidden{{/ISTHEMESELECTED}}">\n    <ul></ul>\n</div>';

      ChooseThemeView.prototype.events = {
        'click button.cancel-theme-switch': function() {
          return this.trigger("cancel:theme:switch");
        },
        'click button.choose-site-language': function() {
          return this.trigger("choose:site:language", this.$el.find('.select-site-language').val());
        }
      };

      ChooseThemeView.prototype.className = 'aj-imp-theme-area';

      ChooseThemeView.prototype.itemView = ThemeView;

      ChooseThemeView.prototype.itemViewContainer = '.aj-imp-block-list ul';

      ChooseThemeView.prototype.serializeData = function() {
        var data;
        data = ChooseThemeView.__super__.serializeData.call(this);
        data.ISTHEMESELECTED = ISTHEMESELECTED === 1;
        return data;
      };

      ChooseThemeView.prototype.onShow = function() {
        $('body').addClass('choose-theme-page');
        this.$el.find('select').selectpicker();
        return this.$el.find('select.choose-site-language').val();
      };

      ChooseThemeView.prototype.onClose = function() {
        return $('body').removeClass('choose-theme-page');
      };

      ChooseThemeView.prototype.onSiteLanguageUpdated = function() {
        this.$el.find('.default-language-selection').hide();
        return this.$el.find('.aj-imp-block-list').removeClass('hidden');
      };

      return ChooseThemeView;

    })(Marionette.CompositeView);
  });
});
