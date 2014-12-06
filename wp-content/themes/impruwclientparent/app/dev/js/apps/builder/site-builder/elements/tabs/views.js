var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Tabs.Views', function(Views, App) {
    var TabPaneView;
    TabPaneView = (function(_super) {
      __extends(TabPaneView, _super);

      function TabPaneView() {
        return TabPaneView.__super__.constructor.apply(this, arguments);
      }

      TabPaneView.prototype.tagName = 'div';

      TabPaneView.prototype.className = ' tab-pane column empty-column';

      TabPaneView.prototype.template = '';

      TabPaneView.prototype.onRender = function() {
        var id;
        id = _.uniqueId('tab-');
        this.$el.attr('role', 'tabpanel').attr('id', id);
        this.$el.attr('data-name', this.model.get('tabName'));
        return this.model.set('id', id);
      };

      TabPaneView.prototype.onShow = function() {
        return this.$el.sortable({
          revert: 'invalid',
          items: '> .element-wrapper',
          connectWith: '.droppable-column, .droppable-column .column',
          handle: '.aj-imp-drag-handle',
          start: function(e, ui) {
            window.dragging = true;
          },
          stop: function(e, ui) {
            window.dragging = false;
          },
          helper: this._getHelper,
          opacity: .65,
          placeholder: "ui-sortable-placeholder builder-sortable-placeholder",
          out: (function(_this) {
            return function(evt, ui) {
              _this.$el.closest('.tab-container').closest('.element-wrapper').removeClass('hover-class');
              window.dragging = false;
            };
          })(this),
          over: (function(_this) {
            return function() {
              _.delay(function() {
                return _this.$el.closest('.tab-container').closest('.element-wrapper').addClass('hover-class');
              }, 100);
              window.dragging = true;
            };
          })(this),
          remove: (function(_this) {
            return function(evt, ui) {
              _this.$el.trigger("element:moved", $(evt.target));
              if ($(evt.target).children().length === 0) {
                return $(evt.target).addClass('empty-column');
              }
            };
          })(this),
          update: (function(_this) {
            return function(e, ui) {
              if (ui.item.find('form').find('input[name="element"]').val() === 'Row') {
                ui.item.children('.element-markup').children().trigger('row:is:moved', ui.item.children('.element-markup').children().prop('id'));
              }
              return $(e.target).removeClass('empty-column');
            };
          })(this)
        });
      };

      return TabPaneView;

    })(Marionette.ItemView);
    return Views.TabsView = (function(_super) {
      __extends(TabsView, _super);

      function TabsView() {
        return TabsView.__super__.constructor.apply(this, arguments);
      }

      TabsView.prototype.className = 'tab-container';

      TabsView.prototype.template = '<!-- Nav tabs --> <ul class="nav nav-tabs " role="tablist"> </ul> <div class="add-tab"><span class="bicon icon-uniF193"></span>&nbsp;Add Tab</div> <!-- Tab panes --> <div class="tab-content"> </div>';

      TabsView.prototype.itemView = TabPaneView;

      TabsView.prototype.itemViewContainer = '.tab-content';

      TabsView.prototype.collectionEvents = {
        'add': 'collectionAdded'
      };

      TabsView.prototype.events = {
        'click .add-tab': function() {
          return this.collection.add({
            position: this.collection.size() + 1,
            element: 'TabPane',
            elements: [],
            tabName: 'tab'
          });
        },
        'blur .nav-tabs span': function(evt) {
          return this.$el.find("" + ($(evt.target).parent().attr('href'))).attr('data-name', $(evt.target).text());
        },
        'click .delete-tab-btn': function(evt) {
          var id;
          evt.stopPropagation();
          if (this.collection.size() <= 1) {
            bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t('Sorry, at least one tab should be present') + "</h4>");
            return;
          }
          id = $(evt.target).closest('.delete-tab-btn').siblings('a').first().attr('href');
          id = _.trim(id, '#');
          if (!$("#" + id).isEmptyColumn()) {
            bootbox.alert("<h4 class='delete-message'>" + _.polyglot.t("The tab is not empty. Please delete elements inside tab content to remove") + "</h4>");
            return;
          }
          $(evt.target).closest('li').remove();
          return this.collection.remove(this.collection.get(id));
        }
      };

      TabsView.prototype.onRender = function() {
        this.$el.attr('role', "tabpanel");
        this.$el.addClass(this.model.get('style'));
        return this.onSetJustified(this.model.get('justified'));
      };

      TabsView.prototype.initialize = function(opt) {
        var col, column, i, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
        if (opt == null) {
          opt = {};
        }
        this.collection = new Backbone.Collection;
        if (this.model.get('elements').length === 0) {
          _ref = [1, 2];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            _results.push(this.collection.add({
              position: i,
              element: 'TabPane',
              tabName: 'tab',
              elements: []
            }, {
              silent: true
            }));
          }
          return _results;
        } else {
          _ref1 = this.model.get('elements');
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            column = _ref1[_j];
            col = _.clone(column);
            delete col.elements;
            _results1.push(this.collection.add(col, {
              silent: true
            }));
          }
          return _results1;
        }
      };

      TabsView.prototype.onAfterItemAdded = function(itemView) {
        var id;
        id = itemView.$el.attr('id');
        return this.$el.find('ul.nav-tabs').append('<li role="presentation" class=""><a href="#' + id + '" role="tab" data-toggle="tab"><span contenteditable="true">' + itemView.model.get('tabName') + '</span></a><div class="delete-tab-btn">&times;</div></li>');
      };

      TabsView.prototype.onShow = function() {
        this.$el.tabs();
        return this.$el.find('.nav-tabs').sortable({
          axis: 'x',
          distance: 10,
          delay: 150,
          cancel: 'span[contenteditable="true"]',
          cursor: 'move',
          stop: (function(_this) {
            return function(evt, ui) {
              var id, index, old;
              index = ui.item.index();
              id = ui.item.find('a').attr('href');
              old = _this.$el.find('.tab-content').children(id).detach();
              if (index === 0) {
                return _this.$el.find('.tab-content').prepend(old);
              } else if (index === -1) {

              } else {
                return $(old).insertAfter(_this.$el.find('.tab-content').children(':eq(' + (index - 1) + ')'));
              }
            };
          })(this)
        });
      };

      TabsView.prototype.collectionAdded = function() {
        return _.delay((function(_this) {
          return function() {
            return _this.$el.tabs('refresh');
          };
        })(this), 200);
      };

      TabsView.prototype.onStyleChanged = function(newStyle, old) {
        if (!_(old).isEmpty()) {
          this.$el.removeClass(old);
        }
        return this.$el.addClass(newStyle);
      };

      TabsView.prototype.onBeforeClose = function() {
        if (!this.$el.find('.tab-content').canBeDeleted()) {
          return false;
        } else {
          return true;
        }
      };

      TabsView.prototype.onSetJustified = function(val) {
        if (val === true) {
          return this.$el.find('ul.nav.nav-tabs').addClass("nav-justified");
        } else {
          return this.$el.find('ul.nav.nav-tabs').removeClass("nav-justified");
        }
      };

      return TabsView;

    })(Marionette.CompositeView);
  });
});
