var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'text!apps/builder/site-builder/show/templates/maintemplate.html', 'text!apps/builder/site-builder/show/templates/builder.html', 'moment'], function(App, mainviewTpl, builderTpl, moment) {
  return App.module('SiteBuilderApp.Show.View', function(View, App, Backbone, Marionette, $, _) {
    var NoRevisionView, RevisionView, SingleRevision;
    View.MainView = (function(_super) {
      __extends(MainView, _super);

      function MainView() {
        this.revisionLinkClicked = __bind(this.revisionLinkClicked, this);
        this.addPageRevisions = __bind(this.addPageRevisions, this);
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
        'click .publish-page': function(evt) {
          evt.preventDefault();
          return App.execute("publish:page");
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
        _.delay((function(_this) {
          return function() {
            var value;
            value = _this.$el.find('select#builder-page-sel').selectpicker('val');
            return _this.trigger('editable:page:changed', value);
          };
        })(this), 250);
        return this.$el.find('#aj-imp-revision-sel').on('show.bs.dropdown', this.addPageRevisions);
      };

      MainView.prototype.addPageRevisions = function() {
        this.clearRevisionItems();
        this.addFetchSpinner();
        return this.trigger("add:page:revisions");
      };

      MainView.prototype.addFetchSpinner = function() {
        this.$el.find('#aj-imp-revision-sel ul').append('<li class="spinner"></li>');
        return this.$el.find('#aj-imp-revision-sel ul li.spinner').spin();
      };

      MainView.prototype.onAddPageRevisionItems = function(collection) {
        var revisionView;
        this.clearRevisionItems();
        revisionView = new RevisionView({
          collection: collection
        });
        revisionView.render();
        this.listenTo(revisionView, 'itemview:revision:link:clicked', this.revisionLinkClicked);
        return this.$el.find('#aj-imp-revision-sel').append(revisionView.$el);
      };

      MainView.prototype.revisionLinkClicked = function(iv, id) {
        return this.trigger("revision:link:clicked", id);
      };

      MainView.prototype.clearRevisionItems = function() {
        return this.$el.find('#aj-imp-revision-sel ul').empty();
      };

      return MainView;

    })(Marionette.Layout);
    SingleRevision = (function(_super) {
      __extends(SingleRevision, _super);

      function SingleRevision() {
        return SingleRevision.__super__.constructor.apply(this, arguments);
      }

      SingleRevision.prototype.tagName = 'li';

      SingleRevision.prototype.template = '<div class="aj-imp-revision row"> <div class="col-sm-5 date"> {{datetime}} </div> <div class="col-sm-7 time"> {{timeago}} </div> </div>';

      SingleRevision.prototype.events = {
        'click': function(e) {
          return this.trigger("revision:link:clicked", this.model.get('ID'));
        }
      };

      SingleRevision.prototype.serializeData = function() {
        var data;
        data = SingleRevision.__super__.serializeData.call(this);
        data.timestamp = moment(data.post_modified).toDate().getTime();
        data.timeago = moment(data.post_modified).fromNow();
        data.datetime = moment(data.post_modified).format('D/MM/YYYY h:m:s');
        return data;
      };

      SingleRevision.prototype.onRender = function() {
        return this.$el.attr('role', 'presentation').attr('data-revision-id', this.model.get('id'));
      };

      return SingleRevision;

    })(Marionette.ItemView);
    NoRevisionView = (function(_super) {
      __extends(NoRevisionView, _super);

      function NoRevisionView() {
        return NoRevisionView.__super__.constructor.apply(this, arguments);
      }

      NoRevisionView.prototype.tagName = 'li';

      NoRevisionView.prototype.template = 'No revision found';

      return NoRevisionView;

    })(Marionette.ItemView);
    RevisionView = (function(_super) {
      __extends(RevisionView, _super);

      function RevisionView() {
        return RevisionView.__super__.constructor.apply(this, arguments);
      }

      RevisionView.prototype.tagName = 'ul';

      RevisionView.prototype.className = 'dropdown-menu pull-right revision-dropdown';

      RevisionView.prototype.itemView = SingleRevision;

      RevisionView.prototype.emptyView = NoRevisionView;

      RevisionView.prototype.onRender = function() {
        return this.$el.attr('role', 'menu');
      };

      RevisionView.prototype.onBeforeRender = function() {
        return this.collection.sort();
      };

      return RevisionView;

    })(Marionette.CollectionView);
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
