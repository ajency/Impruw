var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('ChangeThemeFontApp.Views', function(Views, App) {
    Views.ChangeThemeFontLayout = (function(_super) {
      __extends(ChangeThemeFontLayout, _super);

      function ChangeThemeFontLayout() {
        return ChangeThemeFontLayout.__super__.constructor.apply(this, arguments);
      }

      ChangeThemeFontLayout.prototype.template = '<div id="theme-font-set"></div>';

      ChangeThemeFontLayout.prototype.className = 'font-picker-container';

      ChangeThemeFontLayout.prototype.dialogOptions = {
        modal_title: _.polyglot.t('Choose Theme Font'),
        modal_size: 'medium-modal'
      };

      ChangeThemeFontLayout.prototype.regions = {
        themefontsetRegion: '#theme-font-set'
      };

      return ChangeThemeFontLayout;

    })(Marionette.Layout);
    return Views.ThemeFontSetView = (function(_super) {
      __extends(ThemeFontSetView, _super);

      function ThemeFontSetView() {
        return ThemeFontSetView.__super__.constructor.apply(this, arguments);
      }

      ThemeFontSetView.prototype.template = '<select> {{#fonts}} <option value="{{family}}">{{family}}</option> {{/fonts}} </select> <button class="btn btn-alert change-font-cancel">cancel</button> <button class="btn btn-primary change-font-apply">apply</button>';

      ThemeFontSetView.prototype.mixinTemplateHelpers = function(data) {
        data = ThemeFontSetView.__super__.mixinTemplateHelpers.call(this, data);
        console.log(this.collection);
        data.fonts = this.collection.toJSON();
        return data;
      };

      ThemeFontSetView.prototype.events = {
        'change select': 'changeFont',
        'click .change-font-cancel': function() {
          if ($('style#theme-font-preview').length) {
            $('style#theme-font-preview').remove();
          }
          return this.trigger('dialog:close');
        },
        'click .change-font-apply': function() {
          var html, selectedModel;
          if ($('style#theme-font-preview').length) {
            $('style#theme-font-preview').remove();
          }
          if ($('style#theme-font-style').length) {
            $('style#theme-font-style').remove();
          }
          selectedModel = this.collection.findWhere({
            family: this.$el.find('select').val()
          });
          this.model.set(selectedModel.toJSON());
          console.log(this.model);
          html = "<style id='theme-font-style'> @font-face { font-family: '" + (selectedModel.get('family')) + "'; src: url('";
          html += selectedModel.get('files').regular != null ? selectedModel.get('files').regular : selectedModel.get('files')[0];
          html += "'); } .site-style-container{ font-family : '" + (selectedModel.get('family')) + "' }</style>";
          $('head').append(html);
          return this.trigger('dialog:close');
        }
      };

      ThemeFontSetView.prototype.initialize = function() {
        return this.collection = Marionette.getOption(this, 'collection');
      };

      ThemeFontSetView.prototype.onShow = function() {
        this.$el.find('select').selectpicker();
        console.log(this.model);
        if (this.model.get('family')) {
          return this.$el.find('select').selectpicker('val', this.model.get('family'));
        }
      };

      ThemeFontSetView.prototype.changeFont = function(e) {
        var html, selectedModel;
        console.log($(e.target).val());
        if ($('style#theme-font-preview').length) {
          $('style#theme-font-preview').remove();
        }
        selectedModel = this.collection.findWhere({
          family: $(e.target).val()
        });
        html = "<style id='theme-font-preview'> @font-face { font-family: '" + (selectedModel.get('family')) + "'; src: url('";
        html += selectedModel.get('files').regular != null ? selectedModel.get('files').regular : selectedModel.get('files')[0];
        html += "'); } .site-style-container{ font-family : '" + (selectedModel.get('family')) + "' }</style>";
        return $('head').append(html);
      };

      ThemeFontSetView.prototype.onClose = function() {
        if ($('style#theme-font-preview').length) {
          return $('style#theme-font-preview').remove();
        }
      };

      return ThemeFontSetView;

    })(Marionette.ItemView);
  });
});
