var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module("ChooseTheme.Views", function(Views, App) {
    var ThemeView;
    ThemeView = (function(_super) {
      __extends(ThemeView, _super);

      function ThemeView() {
        return ThemeView.__super__.constructor.apply(this, arguments);
      }

      ThemeView.prototype.template = '<img src="{{image_url}}"> <h6 class="desc">{{post_title}}</h6> <div class="aj-imp-choose-btn"> {{^currentTheme}}<a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Choose{{/polyglot}}</a>{{/currentTheme}} <a href="{{preview_link}}" target="_newtab{{ID}}" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;{{#polyglot}}Preview{{/polyglot}}</a> </div> {{#currentTheme}}<div class="current-wrapper"><div class="current">{{#polyglot}}Current Theme{{/polyglot}}</div></div>{{/currentTheme}}';

      ThemeView.prototype.className = 'block';

      ThemeView.prototype.tagName = 'li';

      ThemeView.prototype.serializeData = function() {
        var data;
        data = ThemeView.__super__.serializeData.call(this);
        data.currentTheme = CURRENTTHEME === _.slugify(data.post_title);
        data.post_title = _.polyglot.t(data.post_title);
        return data;
      };

      ThemeView.prototype.events = {
        'click a.choose-theme': function(e) {
          e.stopPropagation();
          e.preventDefault();
          return bootbox.dialog({
            title: "<h4 class='delete-message'>" + _.polyglot.t('Are you sure?') + "</h4>",
            message: _.polyglot.t('You will lose your layout if you switch themes, you saved content can be retrieved from unused elements box. Your uploaded images are saved in the image gallery, so you will need to add them again.'),
            buttons: {
              cancelswitch: {
                label: _.polyglot.t('No, I don\'t want to switch themes'),
                className: "btn-default",
                callback: (function(_this) {
                  return function() {
                    _this.trigger("cancel:theme:switch");
                    App.navigate('');
                    return $('body').removeClass('choose-theme-page');
                  };
                })(this)
              },
              "switch": {
                label: _.polyglot.t('Yes, switch my theme'),
                className: "btn-primary",
                callback: (function(_this) {
                  return function() {
                    bootbox.hideAll();
                    _this.$el.find('.aj-imp-choose-btn').html('<span class="glyphicon glyphicon-info-sign pulse"></span><div class="msg-1">' + _.polyglot.t("Creating pages with demo content.") + ' </div><div class="msg-2">' + _.polyglot.t("Applying the theme colors.") + ' </div><div class="msg-3">' + _.polyglot.t("Prepping up the elements.") + ' </div><div class="msg-4">' + _.polyglot.t("Hang on, we are almost done...") + ' </div>').show();
                    _.delay(function() {
                      return _this.$el.find('.msg-1').show().addClass('slideRight');
                    }, 1000);
                    _.delay(function() {
                      return _this.$el.find('.msg-2').show().addClass('slideRight');
                    }, 2000);
                    _.delay(function() {
                      return _this.$el.find('.msg-3').show().addClass('slideRight');
                    }, 3000);
                    _.delay(function() {
                      return _this.$el.find('.msg-4').show().addClass('slideRight');
                    }, 4000);
                    return _this.trigger("choose:theme:clicked", _this.model);
                  };
                })(this)
              }
            }
          });
        }
      };

      return ThemeView;

    })(Marionette.ItemView);
    return Views.ChooseThemeView = (function(_super) {
      __extends(ChooseThemeView, _super);

      function ChooseThemeView() {
        return ChooseThemeView.__super__.constructor.apply(this, arguments);
      }

      ChooseThemeView.prototype.template = '<h2 class="page-title list-title">{{#polyglot}}Choose Site Theme{{/polyglot}}</h2>\n <p class="desc list-desc">{{#polyglot}}Theme applied for pages{{/polyglot}}\n {{#polyglot}}Customise logo colors{{/polyglot}}\n    {{#polyglot}}Suit site preferences{{/polyglot}}</p>\n {{#ISTHEMESELECTED}}\n <button class="btn btn-danger cancel-theme-switch">{{#polyglot}}Cancel{{/polyglot}}</button>\n {{/ISTHEMESELECTED}}\n <div class="aj-imp-block-list">\n <ul></ul>\n </div>';

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

      return ChooseThemeView;

    })(Marionette.CompositeView);
  });
});
