var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.Address.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.AddressView = (function(_super) {
      __extends(AddressView, _super);

      function AddressView() {
        return AddressView.__super__.constructor.apply(this, arguments);
      }

      return AddressView;

    })(Marionette.Layout);
    return {
      template: '<div class="main-test"><div id="test"></div></div>',
      tagName: 'div',
      regions: {
        elementRegion: '#test'
      }
    };
  });
});
