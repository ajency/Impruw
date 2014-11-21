var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Tabs.Views', function(Views, App) {
    var TabPaneView;
    TabPaneView = (function(_super) {
      __extends(TabPaneView, _super);

      function TabPaneView() {
        return TabPaneView.__super__.constructor.apply(this, arguments);
      }

      TabPaneView.prototype.tagName = 'div';

      TabPaneView.prototype.className = ' tab-pane';

      TabPaneView.prototype.template = '';

      TabPaneView.prototype.onRender = function() {
        return this.$el.attr('role', 'tabpanel').attr('id', _.uniqueId('tab-'));
      };

      return TabPaneView;

    })(Marionette.ItemView);
    return Views.TabsView = (function(_super) {
      __extends(TabsView, _super);

      function TabsView() {
        return TabsView.__super__.constructor.apply(this, arguments);
      }

      TabsView.prototype.template = '<div class="tab-container tabs-style-flip" role="tabpanel"> <!-- Nav tabs --> <ul class="nav nav-tabs nav-justified" role="tablist"> </ul> <!-- Tab panes --> <div class="tab-content"> </div> </div>';

      TabsView.prototype.itemView = TabPaneView;

      TabsView.prototype.itemViewContainer = '.tab-content';

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
              elements: []
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
            _results1.push(this.collection.add(col));
          }
          return _results1;
        }
      };

      TabsView.prototype.onAfterItemAdded = function(itemView) {
        var id;
        id = itemView.$el.attr('id');
        return this.$el.find('ul.nav-tabs').append('<li role="presentation" class="active"><a href="#' + id + '" role="tab" data-toggle="tab"><span>Tab 1</span></a></li>');
      };

      return TabsView;

    })(Marionette.CompositeView);
  });
});
