var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Title.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TitleView = (function(_super) {
      __extends(TitleView, _super);

      function TitleView() {
        this.configureEditor = __bind(this.configureEditor, this);
        this.setUpCKEditor = __bind(this.setUpCKEditor, this);
        return TitleView.__super__.constructor.apply(this, arguments);
      }

      TitleView.prototype.tagName = 'h3';

      TitleView.prototype.template = '';

      TitleView.prototype.className = 'title';

      TitleView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        },
        'blur': function() {
          return this.trigger("title:element:blur", this.$el.html());
        }
      };

      TitleView.prototype.modelEvents = {
        'change:justify': function(model, justify) {
          this.$el.css('text-align', justify);
          return this.trigger("title:element:blur", this.$el.html());
        }
      };

      TitleView.prototype.initialize = function() {
        return this.$el.on('focus', _.once(this.setUpCKEditor));
      };

      TitleView.prototype.setUpCKEditor = function() {
        var html;
        CKEDITOR.on('instanceCreated', this.configureEditor);
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.attr('id')));
        html = this.$el.html();
        this.editor.setData(html);
        this.editor.on('changedTitleStyle', (function(_this) {
          return function(evt) {
            _this.model.set('style', evt.data.style);
            return _this.model.save();
          };
        })(this));
        this.editor.on('titleStylesInitDone', (function(_this) {
          return function() {
            return _this.editor.fire('initStylesList', {
              style: _this.model.get('style'),
              styles: _this.settingsModel.get('styles')
            });
          };
        })(this));
        this.editor.on('titleJustifyInitDone', (function(_this) {
          return function() {
            return _this.editor.fire('getCurrentJustify', {
              justify: _this.model.get('justify')
            });
          };
        })(this));
        this.editor.on('setCurrentJustify', (function(_this) {
          return function(evt) {
            return _this.model.set('justify', evt.data.justify);
          };
        })(this));
        return this.editor.config.placeholder = 'Click here to enter Title';
      };

      TitleView.prototype.onShow = function() {
        var content, html, _ref;
        this.$el.css('text-align', this.model.get('justify'));
        this.settingsModel = Marionette.getOption(this, 'settingsModel');
        this.$el.attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        content = (_ref = this.model.get('content')[WPML_DEFAULT_LANG]) != null ? _ref : this.model.get('content');
        html = _.stripslashes(content);
        return this.$el.html(html != null ? html : '');
      };

      TitleView.prototype.onClose = function() {
        if (this.editor) {
          return this.editor.destroy();
        }
      };

      TitleView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        if (element.getAttribute('id') === this.$el.attr('id')) {
          return editor.on('configLoaded', function() {
            return editor.config.extraPlugins = 'titlejustify,titlestyles';
          });
        }
      };

      return TitleView;

    })(Marionette.ItemView);
  });
});
