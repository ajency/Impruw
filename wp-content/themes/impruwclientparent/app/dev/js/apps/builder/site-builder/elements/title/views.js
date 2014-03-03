var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Title.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TitleView = (function(_super) {
      __extends(TitleView, _super);

      function TitleView() {
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

      TitleView.prototype.onShow = function() {
        this.$el.attr('contenteditable', 'true').attr('id', _.uniqueId('title-'));
        this.editor = CKEDITOR.inline(document.getElementById(this.$el.attr('id')));
        this.editor.on('instanceCreated', this.configureEditor);
        return this.editor.setData(_.stripslashes(this.model.get('content')));
      };

      TitleView.prototype.onClose = function() {
        return this.editor.destroy();
      };

      TitleView.prototype.configureEditor = function(event) {
        var editor, element;
        editor = event.editor;
        element = editor.element;
        return editor.on("configLoaded", function() {
          return editor.config.toolbarGroups = [
            {
              name: "basicstyles",
              groups: ["basicstyles", "cleanup"]
            }, {
              name: "paragraph",
              groups: ["list", "indent", "blocks", "align", "bidi"]
            }, {
              name: "styles"
            }
          ];
        });
      };

      return TitleView;

    })(Marionette.ItemView);
  });
});
