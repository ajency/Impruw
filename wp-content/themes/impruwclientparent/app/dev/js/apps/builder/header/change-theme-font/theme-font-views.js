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

      ThemeFontSetView.prototype.template = '<div class="row font-view"> <h4>Primary Font</h4> <div class="col-sm-4"> <select id="theme-font-dropdown"> {{#fonts}} <option value="{{family}}">{{family}}</option> {{/fonts}} </select> </div> <div class="col-sm-8 font-preview"> <span class="font-1-preview site-style-container"> Preview your main website font here. </span> </div> </div> {{#secFontsAllowed}} <div class="row font-view"> <h4>Secondary Font</h4> <div class="col-sm-4"> <select id="theme-sec-font-dropdown"> {{#fonts}} <option value="{{family}}">{{family}}</option> {{/fonts}} </select> </div> <div class="col-sm-8 font-preview"> <span class="font-2-preview"> Preview your main website font here. </span> </div> </div> {{/secFontsAllowed}} <div class="font-actions t-a-r"> <button class="btn btn-default btn-sm change-font-cancel">Cancel</button> <button class="btn btn-default btn-sm aj-imp-orange-btn change-font-apply">Apply</button> </div>';

      ThemeFontSetView.prototype.mixinTemplateHelpers = function(data) {
        data = ThemeFontSetView.__super__.mixinTemplateHelpers.call(this, data);
        console.log(this.collection);
        data.fonts = this.collection.toJSON();
        data.secFontsAllowed = this.isSecFontAllowed;
        return data;
      };

      ThemeFontSetView.prototype.events = {
        'change select#theme-font-dropdown': 'changeMainFonts',
        'change select#theme-sec-font-dropdown': 'changeSecFonts',
        'click .change-font-cancel': function() {
          if ($('style#theme-font-preview').length) {
            $('style#theme-font-preview').remove();
          }
          if ($('style#theme-sec-font-preview').length) {
            $('style#theme-sec-font-preview').remove();
          }
          return this.trigger('dialog:close');
        },
        'click .change-font-apply': 'applyFonts'
      };

      ThemeFontSetView.prototype.initialize = function() {
        this.collection = Marionette.getOption(this, 'collection');
        this.secModel = Marionette.getOption(this, 'secModel');
        this.isSecFontAllowed = _.toBoolean(ISSECFONTALLOWED);
        return this.secClasses = '.menu-collapser, .page-title, .action-title, .room-title-container .room-title h1 , .roomsummary .room-title, .booking-title, .room-facilities-container .room-facilities-title h4, .font-2-preview';
      };

      ThemeFontSetView.prototype.onShow = function() {
        this.$el.find('select').selectpicker();
        if (this.model.get('family')) {
          this.$el.find('select#theme-font-dropdown').selectpicker('val', this.model.get('family')).selectpicker('refresh');
        }
        if (this.secModel.get('family')) {
          return this.$el.find('select#theme-sec-font-dropdown').selectpicker('val', this.secModel.get('family')).selectpicker('refresh');
        }
      };

      ThemeFontSetView.prototype.changeMainFonts = function(e) {
        var selectedModel;
        if ($('style#theme-font-preview').length) {
          $('style#theme-font-preview').remove();
        }
        if ($(e.target).val() === 'Default') {
          return $('head').append("<style id='theme-font-preview'>.site-style-container{ font-family : 'Lato', sans-serif; }</style>");
        } else {
          selectedModel = this.collection.findWhere({
            family: $(e.target).val()
          });
          return this.addStyleMarkup(selectedModel, 'theme-font-preview', '.site-style-container');
        }
      };

      ThemeFontSetView.prototype.changeSecFonts = function(e) {
        var selectedSecModel;
        if ($('style#theme-sec-font-preview').length) {
          $('style#theme-sec-font-preview').remove();
        }
        if ($(e.target).val() === 'Default') {
          return $('head').append("<style id='theme-sec-font-preview'> " + this.secClasses + "{ font-family : 'Satisfy', cursive; } </style>");
        } else {
          selectedSecModel = this.collection.findWhere({
            family: $(e.target).val()
          });
          return this.addStyleMarkup(selectedSecModel, 'theme-sec-font-preview', this.secClasses);
        }
      };

      ThemeFontSetView.prototype.applyFonts = function() {
        var selectedModel, selectedSecModel;
        if ($('style#theme-font-preview').length) {
          $('style#theme-font-preview').remove();
        }
        if ($('style#theme-font-style').length) {
          $('style#theme-font-style').remove();
        }
        selectedModel = this.collection.findWhere({
          family: this.$el.find('select#theme-font-dropdown').val()
        });
        this.model.set(selectedModel.toJSON());
        this.model.save();
        if (selectedModel.get('family') !== 'Default') {
          this.addStyleMarkup(selectedModel, 'theme-font-style', '.site-style-container');
        }
        if (this.isSecFontAllowed) {
          if ($('style#theme-sec-font-preview').length) {
            $('style#theme-sec-font-preview').remove();
          }
          if ($('style#theme-sec-font-style').length) {
            $('style#theme-sec-font-style').remove();
          }
          selectedSecModel = this.collection.findWhere({
            family: this.$el.find('select#theme-sec-font-dropdown').val()
          });
          this.secModel.set(selectedSecModel.toJSON());
          this.secModel.save();
          if (selectedSecModel.get('family') !== 'Default') {
            this.addStyleMarkup(selectedSecModel, 'theme-sec-font-style', this.secClasses);
          }
        }
        return this.trigger('dialog:close');
      };

      ThemeFontSetView.prototype.onClose = function() {
        if ($('style#theme-font-preview').length) {
          return $('style#theme-font-preview').remove();
        }
      };

      ThemeFontSetView.prototype.addStyleMarkup = function(model, id, classes) {
        var html;
        html = "<style id='" + id + "'> @font-face { font-family: '" + (model.get('family')) + "'; src: url('";
        html += model.get('files').regular != null ? model.get('files').regular : model.get('files')[0];
        html += "'); } " + classes + "{ font-family : '" + (model.get('family')) + "'," + (model.get('category')) + " }</style>";
        return $('head').append(html);
      };

      return ThemeFontSetView;

    })(Marionette.ItemView);
  });
});
