var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'bootbox'], function(App, bootbox) {
  return App.module('SiteBuilderApp.Element.Accordion.Views', function(Views, App) {
    var AccordionTab;
    AccordionTab = (function(_super) {
      __extends(AccordionTab, _super);

      function AccordionTab() {
        return AccordionTab.__super__.constructor.apply(this, arguments);
      }

      AccordionTab.prototype.tagName = 'div';

      AccordionTab.prototype.className = ' panel panel-default ';

      AccordionTab.prototype.template = '<div class="panel-heading" > <h4 class="panel-title"> <a> <span contenteditable="true">{{tab_name}}</span> </a> </h4> <form></form> <div class="delete-accordion-btn"><span class="glyphicon glyphicon-trash"></span></div> </div> <div  class="panel-collapse collapse in" > <div class="panel-body column empty-column"> </div> </div>';

      AccordionTab.prototype.mixinTemplateHelpers = function(data) {
        data = AccordionTab.__super__.mixinTemplateHelpers.call(this, data);
        data.tab_name = data.tabName[WPML_DEFAULT_LANG];
        return data;
      };

      AccordionTab.prototype.events = {
        'click .delete-accordion-btn': function() {
          if (!this.$el.children('.panel-collapse').children('.column').isEmptyColumn()) {
            bootbox.alert("The tab is not empty. Please delete elements inside tab content to remove");
            return;
          }
          return this.model.collection.remove(this.model);
        },
        'blur .panel-title span': function(e) {
          return this.$el.children('.panel-heading').children('form').find("input[name='" + WPML_DEFAULT_LANG + "']").val($(e.target).text());
        }
      };

      AccordionTab.prototype.onShow = function() {
        var object, prop;
        object = this.model.get('tabName');
        for (prop in object) {
          if (object.hasOwnProperty(prop)) {
            this.$el.children('.panel-heading').children('form').append("<input type='hidden' name='" + prop + "' value=" + object[prop] + ">");
          }
        }
        return this.$el.find('.panel-body').sortable({
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
              _this.$el.closest('.accordion-container').closest('.element-wrapper').removeClass('hover-class');
              window.dragging = false;
            };
          })(this),
          over: (function(_this) {
            return function() {
              _.delay(function() {
                return _this.$el.closest('.accordion-container').closest('.element-wrapper').addClass('hover-class');
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

      return AccordionTab;

    })(Marionette.ItemView);
    return Views.AccordionView = (function(_super) {
      __extends(AccordionView, _super);

      function AccordionView() {
        return AccordionView.__super__.constructor.apply(this, arguments);
      }

      AccordionView.prototype.className = 'accordion-container';

      AccordionView.prototype.template = '<div class="panel-group {{style}}" id="accordion" role="tablist" aria-multiselectable="true"> </div> <div class="add-tab"><span class="bicon icon-uniF193"></span>&nbsp;Add Tab</div>';

      AccordionView.prototype.itemView = AccordionTab;

      AccordionView.prototype.itemViewContainer = '.panel-group';

      AccordionView.prototype.collectionEvents = {
        'add': 'collectionAdded'
      };

      AccordionView.prototype.events = {
        'click .add-tab': function() {
          return this.collection.add({
            position: this.collection.size() + 1,
            element: 'AccordionTab',
            elements: [],
            tabName: {
              'en': 'tab',
              'nb': 'tab_N'
            }
          });
        }
      };

      AccordionView.prototype.initialize = function(opt) {
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
              element: 'AccordionTab',
              tabName: {
                'en': 'tab',
                'nb': 'tab_N'
              },
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

      AccordionView.prototype.onShow = function() {
        this.$el.find('.panel-group').accordion({
          header: '.panel-heading',
          heightStyle: "content",
          collapsible: true
        });
        return this.$el.find('.panel-group').sortable({
          axis: "y",
          cancel: '.panel-heading a span',
          forcePlaceholderSize: true,
          handle: ".panel-heading",
          stop: (function(_this) {
            return function(event, ui) {
              ui.item.children(".panel-heading").triggerHandler("focusout");
              return _this.$el.find('.panel-group').accordion("refresh");
            };
          })(this)
        });
      };

      AccordionView.prototype.collectionAdded = function() {
        return _.delay((function(_this) {
          return function() {
            return _this.$el.find('.panel-group').accordion('refresh');
          };
        })(this), 200);
      };

      AccordionView.prototype.onStyleChanged = function(newStyle, old) {
        if (!_(old).isEmpty()) {
          this.$el.find('.panel-group').removeClass(old);
        }
        return this.$el.find('.panel-group').addClass(newStyle);
      };

      return AccordionView;

    })(Marionette.CompositeView);
  });
});
