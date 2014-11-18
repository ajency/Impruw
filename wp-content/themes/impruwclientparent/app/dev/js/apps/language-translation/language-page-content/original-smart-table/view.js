var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalSmartTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptySmartTableView, OriginalSmartTableItemView;
    OriginalSmartTableItemView = (function(_super) {
      __extends(OriginalSmartTableItemView, _super);

      function OriginalSmartTableItemView() {
        return OriginalSmartTableItemView.__super__.constructor.apply(this, arguments);
      }

      OriginalSmartTableItemView.prototype.tagName = 'div';

      OriginalSmartTableItemView.prototype.className = 'form-group legend-group';

      OriginalSmartTableItemView.prototype.template = '<div class="col-sm-12"> <div class="form-group smart-table-elements"> <label class="col-sm-3 control-label" for="">{{element_name}}</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original {{element}}" tabindex="1"> {{{contentText}}} </div> </div> </div> </div>';

      OriginalSmartTableItemView.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      OriginalSmartTableItemView.prototype.mixinTemplateHelpers = function(data) {
        data = OriginalSmartTableItemView.__super__.mixinTemplateHelpers.call(this, data);
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

      return OriginalSmartTableItemView;

    })(Marionette.ItemView);
    EmptySmartTableView = (function(_super) {
      __extends(EmptySmartTableView, _super);

      function EmptySmartTableView() {
        return EmptySmartTableView.__super__.constructor.apply(this, arguments);
      }

      EmptySmartTableView.prototype.template = '<br/><div class="empty-info">You have no smart tables to translate</div><br/>';

      return EmptySmartTableView;

    })(Marionette.ItemView);
    return Views.OriginalSmartTableView = (function(_super) {
      __extends(OriginalSmartTableView, _super);

      function OriginalSmartTableView() {
        return OriginalSmartTableView.__super__.constructor.apply(this, arguments);
      }

      OriginalSmartTableView.prototype.template = '<div id="original-smart-page-table"></div>';

      OriginalSmartTableView.prototype.itemView = OriginalSmartTableItemView;

      OriginalSmartTableView.prototype.emptyView = EmptySmartTableView;

      OriginalSmartTableView.prototype.itemViewContainer = '#original-smart-page-table';

      return OriginalSmartTableView;

    })(Marionette.CompositeView);
  });
});
