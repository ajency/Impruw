var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('LanguageApp.LanguagePageContent.OriginalTable.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.OriginalTableView = (function(_super) {
      __extends(OriginalTableView, _super);

      function OriginalTableView() {
        return OriginalTableView.__super__.constructor.apply(this, arguments);
      }

      OriginalTableView.prototype.tagName = 'div';

      OriginalTableView.prototype.className = 'form-group legend-group';

      OriginalTableView.prototype.template = '<div class="col-sm-12"> <div class="form-group table-elements"> </div> </div>';

      OriginalTableView.prototype.onShow = function() {
        return _.each(this.collection.models, (function(_this) {
          return function(model, index) {
            var content, element, element_name, html;
            element = model.get('element');
            element_name = _.polyglot.t(element);
            content = _.stripslashes(model.get('content'));
            html = '<label class="col-sm-3 control-label" for="">' + element_name + '</label> <div class="col-sm-9 col-sm-offset-3"> <div class="original ' + element + '" tabindex="1">' + content + '</div> </div>';
            return _this.$el.find('.table-elements').append(html);
          };
        })(this));
      };

      return OriginalTableView;

    })(Marionette.ItemView);
  });
});
