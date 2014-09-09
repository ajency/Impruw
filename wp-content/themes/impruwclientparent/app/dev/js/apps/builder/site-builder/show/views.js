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
        this.enableSelectPicker = __bind(this.enableSelectPicker, this);
        this._addToPageSlug = __bind(this._addToPageSlug, this);
        this.onPagePublished = __bind(this.onPagePublished, this);
        this.getOriginalPageId = __bind(this.getOriginalPageId, this);
        this.getCurrentPageId = __bind(this.getCurrentPageId, this);
        this.getCurrentPageName = __bind(this.getCurrentPageName, this);
        this.addPageDropDown = __bind(this.addPageDropDown, this);
        return MainView.__super__.constructor.apply(this, arguments);
      }

      MainView.prototype.template = mainviewTpl;

      MainView.prototype.className = 'aj-imp-builder-area';

      MainView.prototype.collectionEvents = {
        "add": "addPageDropDown"
      };

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
          $(evt.currentTarget).attr('disabled', true);
          this.$el.find('.publish-page ').text('Publishing...');
          return App.execute("publish:page");
        },
        'change select#builder-page-sel': function(evt) {
          this._addToPageSlug(parseInt($(evt.target).val()));
          this.trigger('editable:page:changed', $(evt.target).val());
          App.vent.trigger("change:page:check:single:room");
          this.changePreviewLinkUrl();
          return this.displayPageNameForUpdate();
        },
        'click .add-new-page': function() {
          return this.trigger("add:new:page:clicked");
        },
        'click .btn-update-pg-name': function() {
          var currentPageId, data, updatedPageName;
          currentPageId = this.getCurrentPageId();
          updatedPageName = this.$el.find('#page_name').val();
          data = {
            'post_title': updatedPageName,
            'ID': currentPageId
          };
          return this.trigger("update:page:name", data);
        }
      };

      MainView.prototype.addPageDropDown = function() {
        this.modelAddedToCollection = this.collection.last();
        this.new_page_id = this.modelAddedToCollection.get('ID');
        _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var modelId, originalPageId, page_name, select_html, selectpicker_html;
            modelId = model.get('ID');
            originalPageId = model.get('original_id');
            if (modelId === _this.new_page_id) {
              page_name = model.get('post_title');
              select_html = "<option value='" + modelId + "' data-originalid='" + originalPageId + ("'>" + page_name + "</option>");
              selectpicker_html = "<li rel='" + index + "'> <a tabindex='0' class='' style=''> <span class='text'>" + page_name + "</span> <i class='glyphicon glyphicon-ok icon-ok check-mark'></i> </a> </li>";
              _this.$el.find('select#builder-page-sel').parent().find('div .dropdown-menu ul').append(selectpicker_html);
              return _this.$el.find('select#builder-page-sel').append(select_html);
            }
          };
        })(this));
        return this.enableSelectPicker();
      };

      MainView.prototype.initialize = function() {
        App.reqres.setHandler("get:current:editable:page:name", this.getCurrentPageName);
        App.reqres.setHandler("get:current:editable:page", this.getCurrentPageId);
        return App.reqres.setHandler("get:original:editable:page", this.getOriginalPageId);
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

      MainView.prototype.getOriginalPageId = function() {
        var pageId;
        pageId = this.$el.find('select#builder-page-sel').find(':selected').data('originalid');
        return parseInt(pageId);
      };

      MainView.prototype.onPagePublished = function() {
        this.$el.find('.publish-page ').text('Publish');
        return _.delay((function(_this) {
          return function() {
            _this.$el.find('.publish-page ').removeAttr('disabled');
            return _this.$el.find('.publish-page ').text('Publish');
          };
        })(this), 500);
      };

      MainView.prototype.changePreviewLinkUrl = function() {
        var currentPageId, previewUrl;
        currentPageId = App.request("get:current:editable:page");
        previewUrl = "" + SITEURL + "?preview=true&p=" + currentPageId;
        return this.$el.find('a.preview-current-page').attr('href', previewUrl).attr('target', '_newtab' + Math.floor(Math.random() * 999999));
      };

      MainView.prototype.onShow = function() {
        this.enableSelectPicker();
        _.delay((function(_this) {
          return function() {
            var pageId;
            pageId = $.cookie('current-page-id');
            if (isNaN(parseInt(pageId))) {
              pageId = _this.$el.find('select#builder-page-sel').selectpicker('val');
            }
            _this.$el.find('select#builder-page-sel').selectpicker('val', pageId);
            _this._addToPageSlug(pageId);
            return _this.changePreviewLinkUrl();
          };
        })(this), 250);
        this.$el.find('#aj-imp-revision-sel').on('show.bs.dropdown', this.addPageRevisions);
        return this.displayPageNameForUpdate();
      };

      MainView.prototype._addToPageSlug = function(pageId) {
        var newUrl, page, toArray;
        page = App.request("get:fetched:page", pageId);
        toArray = $('.page-slug-edit').val().split('/');
        newUrl = toArray.pop();
        newUrl = toArray.push(page.get('post_name'));
        newUrl = toArray.join('/');
        return $('.page-slug-edit').val(newUrl);
      };

      MainView.prototype.enableSelectPicker = function() {
        return this.$el.find('select#builder-page-sel').selectpicker({
          style: 'btn-xs btn-default',
          menuStyle: 'dropdown'
        });
      };

      MainView.prototype.addPageRevisions = function() {
        return;
        this.clearRevisionItems();
        this.addFetchSpinner();
        return this.trigger("add:page:revisions");
      };

      MainView.prototype.addFetchSpinner = function() {
        this.$el.find('#aj-imp-revision-sel ul').append('<li class="spinner"></li>');
        return this.$el.find('#aj-imp-revision-sel ul li.spinner').spin();
      };

      MainView.prototype.onAddPageRevisionItems = function(collection) {
        this.clearRevisionItems();
        if (!_.isUndefined(this.revisionView)) {
          this.revisionView.close();
        }
        this.revisionView = new RevisionView({
          collection: collection
        });
        this.revisionView.render();
        this.listenTo(this.revisionView, 'revision:link:clicked', this.revisionLinkClicked);
        return this.$el.find('#aj-imp-revision-sel').append(this.revisionView.$el);
      };

      MainView.prototype.revisionLinkClicked = function(iv, id) {
        return this.trigger("revision:link:clicked", id);
      };

      MainView.prototype.clearRevisionItems = function() {
        return this.$el.find('#aj-imp-revision-sel ul').empty();
      };

      MainView.prototype.displayPageNameForUpdate = function() {
        var currentPageName, singleRoom;
        this.$el.find('#page_name').removeAttr('readonly');
        this.$el.find('.btn-update-pg-name').removeAttr('disabled');
        currentPageName = this.getCurrentPageName();
        singleRoom = this.isSingleRoomPage();
        if (singleRoom === true) {
          this.$el.find('#page_name').attr('readonly', 'readonly');
          this.$el.find('.btn-update-pg-name').attr('disabled', 'disabled');
        }
        return this.$el.find('#page_name').val(currentPageName);
      };

      MainView.prototype.isSingleRoomPage = function() {
        var page, pageName;
        pageName = App.request("get:current:editable:page:name");
        page = false;
        if (pageName === 'Single Room') {
          page = true;
        }
        return page;
      };

      MainView.prototype.onPageNameUpdated = function(pageModel) {
        var page_id, page_name;
        page_name = pageModel.get('post_title');
        page_id = pageModel.get('ID');
        this.$el.find('div .dropdown-menu ul .selected .text').text(page_name);
        this.$el.find('div .btn-group .filter-option').text(page_name);
        this.$el.find("select#builder-page-sel option[value='" + page_id + "']").text(page_name);
        return this.enableSelectPicker();
      };

      return MainView;

    })(Marionette.Layout);
    SingleRevision = (function(_super) {
      __extends(SingleRevision, _super);

      function SingleRevision() {
        return SingleRevision.__super__.constructor.apply(this, arguments);
      }

      SingleRevision.prototype.tagName = 'li';

      SingleRevision.prototype.template = '<div class="aj-imp-revision row"> <div class="col-sm-5 date"> {{datetime}} </div> <div class="col-sm-7 time"> {{post_name}} {{timeago}} </div> </div>';

      SingleRevision.prototype.events = {
        'click': function(e) {
          return App.vent.trigger("revision:link:clicked", this.model.get('ID'));
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
        this._getHelper = __bind(this._getHelper, this);
        return Builder.__super__.constructor.apply(this, arguments);
      }

      Builder.prototype.template = builderTpl;

      Builder.prototype.onShow = function() {
        return this.$el.find('.droppable-column').sortable({
          revert: 'invalid',
          items: '> .element-wrapper',
          connectWith: '.droppable-column,.column',
          start: function(e, ui) {
            window.dragging = true;
          },
          stop: function(e, ui) {
            window.dragging = false;
          },
          out: function() {
            window.dragging = false;
          },
          over: function() {
            window.dragging = true;
          },
          handle: '.aj-imp-drag-handle',
          helper: this._getHelper,
          opacity: .65,
          tolerance: 'pointer',
          receive: this.elementDropped,
          placeholder: "ui-sortable-placeholder builder-sortable-placeholder"
        });
      };

      Builder.prototype._getHelper = function(evt, original) {
        var left;
        left = $(original).width() / 2;
        this.$el.find('.droppable-column').sortable("option", "cursorAt", {
          left: 50,
          top: 25
        });
        return "<div class='element-helper'></div>";
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
