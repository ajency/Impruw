var ColumnView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Table.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.TableView = (function(_super) {
      __extends(TableView, _super);

      function TableView() {
        return TableView.__super__.constructor.apply(this, arguments);
      }

      TableView.prototype.className = 'imp-table';

      TableView.prototype.template = '<table> <thead> {{#tableHeader}} <th></th> {{/tableHeader}} </thead> <tbody><tbody> </table>';

      TableView.prototype.itemContainer = 'tbody';

      TableView.prototype.onShow = function() {
        return this.$el.html(_.stripslashes(this.model.get('content')));
      };

      return TableView;

    })(Marionette.CompositeView);
  });
});

ColumnView = (function(_super) {
  __extends(ColumnView, _super);

  function ColumnView() {
    return ColumnView.__super__.constructor.apply(this, arguments);
  }

  return ColumnView;

})(Marionette.ItemView);
