var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptyTableView, OriginalTableItemView;
    OriginalTableItemView = (function(_super) {
      __extends(OriginalTableItemView, _super);

      function OriginalTableItemView() {
        return OriginalTableItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalTableItemView.prototype.tagName = 'div';

      OriginalTableItemView.prototype.className = 'form-group legend-group';

      OriginalTableItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group table-elements"> <label class="col-sm-3 control-label" for="">{{element_name}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original {{element}}" tabindex="1"> {{{contentText}}} </div> </div> </div> </div>';

      OriginalTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      OriginalTableItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalTableItemView.__super__.mixinTemplateHelpers.call(this, data);
        data.element_name = function() {
          var element_name;
          element_name = _.polyglot.t(data.element);
          return element_name;
        };
        data.contentText = function() {
          var translated_text, _ref;
          translated_text = (_ref = data.content[WPML_DEFAULT_LANG]) != null ? _ref : data.content;
          translated_text = _.stripslashes(translated_text);
          return translated_text;
        };
        return data;
      };

      return OriginalTableItemView;

    })(Marionette.ItemView);
    EmptyTableView = (function(_super) {
      __extends(EmptyTableView, _super);

      function EmptyTableView() {
        return EmptyTableView.__super__.constructor.apply(this, arguments);
      }

      EmptyTableView.prototype.template = '<br/><div class="empty-info">You have no tables to translate</div><br/>';

      return EmptyTableView;

    })(Marionette.ItemView);
    return Views.OriginalTableView = (function(_super) {
      __extends(OriginalTableView, _super);

      function OriginalTableView() {
        return OriginalTableView.__super__.constructor.apply(this, arguments);
      }

      OriginalTableView.prototype.template = '<div id="original-page-table"></div>';

      OriginalTableView.prototype.itemView = OriginalTableItemView;

      OriginalTableView.prototype.emptyView = EmptyTableView;

      OriginalTableView.prototype.itemViewContainer = '#original-page-table';

      return OriginalTableView;

    })(Marionette.CompositeView);
  });
});
