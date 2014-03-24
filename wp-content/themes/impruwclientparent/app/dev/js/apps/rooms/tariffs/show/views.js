var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module("RoomsApp.RoomsTariff.Show.Views", function(Views, App) {
    var DateRangeSingle, PackageSingle;
    PackageSingle = (function(_super) {
      __extends(PackageSingle, _super);

      function PackageSingle() {
        return PackageSingle.__super__.constructor.apply(this, arguments);
      }

      PackageSingle.prototype.className = 'package-block-outer';

      PackageSingle.prototype.template = '<div class="block clearfix"> <h6>{{package_name}}</h6> <div class="package-desc"> {{package_description}} </div> </div>';

      PackageSingle.prototype.serializeData = function() {
        var data;
        data = PackageSingle.__super__.serializeData.call(this);
        data.packagedescription = function() {
          return _(this.package_description).prune(50);
        };
        return data;
      };

      return PackageSingle;

    })(Marionette.ItemView);
    Views.PackagesView = (function(_super) {
      __extends(PackagesView, _super);

      function PackagesView() {
        return PackagesView.__super__.constructor.apply(this, arguments);
      }

      PackagesView.prototype.className = 'tariff package-names clearfix';

      PackagesView.prototype.template = '<div class="packages"><div class="package-blocks header clearfix"></div></div>';

      PackagesView.prototype.itemView = PackageSingle;

      PackagesView.prototype.itemViewContainer = '.package-blocks';

      return PackagesView;

    })(Marionette.CompositeView);
    DateRangeSingle = (function(_super) {
      __extends(DateRangeSingle, _super);

      function DateRangeSingle() {
        return DateRangeSingle.__super__.constructor.apply(this, arguments);
      }

      DateRangeSingle.prototype.className = 'tariff clearfix';

      DateRangeSingle.prototype.events = {
        'click .package-block-outer': function(e) {
          var id;
          e.stopPropagation();
          id = $(e.target).attr('data-id');
          return this.trigger("show:edit:tariff", 2);
        }
      };

      DateRangeSingle.prototype.template = '<div class="date-range"> <div class="from"> From <span class="date">{{startdate}}</span> </div> <div class="to"> To <span class="date">{{enddate}}</span> </div> </div> <div class="packages"> <div class="package-blocks clearfix"> {{#tariffs}} <div class="package-block-outer" data-id="{{id}}"> <div class="block clearfix"> <div class="weekday"> Weekdays <span class="price">{{weekdays.charge}}</span> </div> <div class="weekend"> Weekends <span class="price">{{weekends.charge}}</span> </div> <div class="tariff-label clearfix">Extra Adult</div> <div class="weekday"> <span class="price">{{weekdays.extra_adult}}</span> </div> <div class="weekend"> <span class="price">{{weekends.extra_adult}}</span> </div> <div class="tariff-label clearfix">Extra Child</div> <div class="weekday"> <span class="price">{{weekdays.extra_child}}</span> </div> <div class="weekend"> <span class="price">{{weekends.extra_child}}</span> </div> </div> </div> {{/tariffs}} </div> </div>';

      DateRangeSingle.prototype.serializeData = function() {
        var data;
        data = DateRangeSingle.__super__.serializeData.call(this);
        data.startdate = function() {
          return moment(new Date(this.start_date)).format('DD/MMM');
        };
        data.enddate = function() {
          return moment(new Date(this.end_date)).format('DD/MMM');
        };
        console.log(data);
        return data;
      };

      return DateRangeSingle;

    })(Marionette.ItemView);
    return Views.TariffsView = (function(_super) {
      __extends(TariffsView, _super);

      function TariffsView() {
        return TariffsView.__super__.constructor.apply(this, arguments);
      }

      TariffsView.prototype.itemView = DateRangeSingle;

      return TariffsView;

    })(Marionette.CollectionView);
  });
});
