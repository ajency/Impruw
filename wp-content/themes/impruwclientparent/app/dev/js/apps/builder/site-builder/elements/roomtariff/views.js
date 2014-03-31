var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.RoomTariff.Views', function(Views, App, Backbone, Marionette, $, _) {
    return Views.RoomTariffView = (function(_super) {
      __extends(RoomTariffView, _super);

      function RoomTariffView() {
        return RoomTariffView.__super__.constructor.apply(this, arguments);
      }

      RoomTariffView.prototype.className = 'tariff clearfix';

      RoomTariffView.prototype.template = '<div class="date-range"> <div class="from"> From <span class="date">01/Jan</span> </div> <div class="to"> To <span class="date">31/Jan</span> </div> </div> <div class="packages"> <div class="package-blocks clearfix"> <div class="package-block-outer" data-id="1"> <div class="block clearfix"> <div class="weekday"> Weekdays <span class="price">$100</span> </div> <div class="weekend"> Weekends <span class="price">$200</span> </div> <div class="tariff-label clearfix">Extra Adult</div> <div class="weekday"> <span class="price">$20</span> </div> <div class="weekend"> <span class="price">$30</span> </div> <div class="tariff-label clearfix">Extra Child</div> <div class="weekday"> <span class="price">$10</span> </div> <div class="weekend"> <span class="price">$15</span> </div> <div class="block-action"> <button class="btn btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button> </div> </div> </div> </div> </div>';

      return RoomTariffView;

    })(Marionette.ItemView);
  });
});
