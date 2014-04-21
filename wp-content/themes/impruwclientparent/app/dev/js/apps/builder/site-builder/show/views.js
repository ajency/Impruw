var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/show/templates/maintemplate.html', 'text!apps/builder/site-builder/show/templates/builder.html'], function(App, mainviewTpl, builderTpl) {
  return App.module('SiteBuilderApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
    View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        this.getCurrentPageId = __bind(this.getCurrentPageId, this);
        this.getCurrentPageName = __bind(this.getCurrentPageName, this);
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'aj-imp-builder-area';

      MainView.prototype.templateHelpers = function(data) {
        if (data == null) {
          data = {};
        }
        data.SITEURL = SITEURL + '/';
        data.pages = this.collection.toJSON();
        return data;
      };

      MainView.prototype.events = {
        'click .auto-save': function(evt) {
          evt.preventDefault();
          return App.commands.execute("auto:save");
        },
        'change select#builder-page-sel': function(evt) {
          return this.trigger('editable:page:changed', $(evt.target).val());
        }
      };

      MainView.prototype.initialize = function() {
        App.reqres.setHandler("get:current:editable:page:name", this.getCurrentPageName);
        return App.reqres.setHandler("get:current:editable:page", this.getCurrentPageId);
      };

      MainView.prototype.getCurrentPageName = function() {
        var name, pageId;
        pageId = this.getCurrentPageId();
        name = this.$el.find('select#builder-page-sel').find("option[value='" + pageId + "']").text();
        return name;
      };

      MainView.prototype.getCurrentPageId = function() {
        var pageId;
        pageId = this.$el.find('select#builder-page-sel').val();
        return parseInt(pageId);
      };

      MainView.prototype.onShow = function() {
        this.$el.find('select#builder-page-sel').selectpicker({
          style: 'btn-xs btn-default',
          menuStyle: 'dropdown'
        });
        return _.delay((function(_this) {
          return function() {
            var value;
            value = _this.$el.find('select#builder-page-sel').selectpicker('val');
            return _this.trigger('editable:page:changed', value);
          };
        })(this), 250);
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
        return this.$el.find('.droppable-column').sortable({
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
          tolerance: 'pointer',
          receive: this.elementDropped
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
