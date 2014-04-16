var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app', 'text!apps/builder/site-builder/show/templates/maintemplate.html', 'text!apps/builder/site-builder/show/templates/builder.html'], function(App, mainviewTpl, builderTpl) {
  return App.module('SiteBuilderApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
    View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'aj-imp-builder-area';

      MainView.prototype.templateHelpers = function(data) {
        if (data == null) {
          data = {};
        }
        data.SITEURL = SITEURL;
        return data;
      };

      MainView.prototype.events = {
        'click .auto-save': function(evt) {
          evt.preventDefault();
          return App.commands.execute("auto:save");
        }
      };

      return MainView;

    })(Marionette.Layout);
    return View.Builder = (function(_super) {
      __extends(Builder, _super);

      function Builder() {
        this.elementDropped = __bind(this.elementDropped, this);
        return Builder.__super__.constructor.apply(this, arguments);
      }

      Builder.prototype.template = builderTpl;

      Builder.prototype.onShow = function() {
        this.$el.find('.droppable-column').sortable({
          revert: 'invalid',
          items: '> .element-wrapper',
          connectWith: '.droppable-column,.column',
          start: function(e, ui) {
            var h, w;
            w = ui.item.width();
            h = ui.item.height() > 200 ? 200 : ui.item.height();
            ui.placeholder.height(h);
            window.dragging = true;
          },
          stop: function(e, ui) {
            window.dragging = false;
          },
          handle: '.aj-imp-drag-handle',
          helper: 'clone',
          opacity: .65,
          receive: this.elementDropped
        });
        return this.$el.find('select#builder-page-sel').selectpicker({
          style: 'btn-xs btn-default',
          menuStyle: 'dropdown'
        });
      };

      Builder.prototype.elementDropped = function(evt, ui) {
        var metaId, type;
        if (ui.item.prop("tagName") === 'LI') {
          type = ui.item.attr('data-element');
          metaId = ui.item.attr('data-meta-id');
          metaId = metaId !== void 0 ? parseInt(metaId) : 0;
          return this.trigger("add:new:element", $(evt.target), type, metaId);
        }
      };

      return Builder;

    })(Marionette.ItemView);
  });
});
