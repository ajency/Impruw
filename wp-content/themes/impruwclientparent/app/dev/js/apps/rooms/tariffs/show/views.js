var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'moment'], function(App, moment) {
  return App.module("RoomsApp.RoomsTariff.Show.Views", function(Views, App) {
    var DateRageView, PackageSingle, SingleTariff;
    PackageSingle = (function(_super) {
      __extends(PackageSingle, _super);

      function PackageSingle() {
        return PackageSingle.__super__.constructor.apply(this, arguments);
      }

      PackageSingle.prototype.className = 'package-block-outer';

      PackageSingle.prototype.template = '<div class="block clearfix"> <h6>{{plan_name}}</h6> <div class="package-desc"> {{plandescription}} </div> <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a> </div>';

      PackageSingle.prototype.serializeData = function() {
        var data;
        data = PackageSingle.__super__.serializeData.call(this);
        data.plandescription = function() {
          return _(this.plan_description).prune(50);
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

      PackagesView.prototype.template = '<div class="packages"><div class="package-blocks header clearfix"></div><button type="button" class="btn-add-plan"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Add Plan</button></div>';

      PackagesView.prototype.itemView = PackageSingle;

      PackagesView.prototype.itemViewContainer = '.package-blocks';

      return PackagesView;

    })(Marionette.CompositeView);
    SingleTariff = (function(_super) {
      __extends(SingleTariff, _super);

      function SingleTariff() {
        return SingleTariff.__super__.constructor.apply(this, arguments);
      }

      SingleTariff.prototype.className = 'package-block-outer';

      SingleTariff.prototype.events = {
        'click .edit-trariff': function() {
          return App.execute("show:edit:tariff", {
            model: this.model
          });
        },
        'click .add-trariff': function() {
          return App.execute("show:add:tariff", {
            model: this.model
          });
        }
      };

      SingleTariff.prototype.modelEvents = {
        'change': 'render'
      };

      SingleTariff.prototype.template = '{{^id}} <div class="block clearfix not-yet-added empty"> <span class="no-data"> <span class="glyphicon glyphicon-exclamation-sign"></span> </span> No Data Added <div class="block-action"> <button type="button" class="btn btn-sm add-trariff edit-tran"> <span class="glyphicon glyphicon-pencil"></span>&nbsp;Add </button> </div> </div> {{/id}} {{#id}} <div class="block clearfix" style="top:-12px"> <div class="weekday"> Weekdays <span class="price">{{weekday.charge}}</span> </div> <div class="weekend"> Weekends <span class="price">{{weekend.charge}}</span> </div> <div class="tariff-label clearfix">Extra Adult</div> <div class="weekday"> <span class="price">{{weekday.extra_adult}}</span> </div> <div class="weekend"> <span class="price">{{weekend.extra_adult}}</span> </div> <div class="tariff-label clearfix">Extra Child</div> <div class="weekday"> <span class="price">{{weekday.extra_child}}</span> </div> <div class="weekend"> <span class="price">{{weekend.extra_child}}</span> </div> <div class="block-action"> <button type="button" class="btn btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button> </div> </div> {{/id}}';

      return SingleTariff;

    })(Marionette.ItemView);
    DateRageView = (function(_super) {
      __extends(DateRageView, _super);

      function DateRageView() {
        return DateRageView.__super__.constructor.apply(this, arguments);
      }

      DateRageView.prototype.template = '<div class="date-range"> <div class="from"> <span class="date">{{daterange_name}}</span> <span class="date">{{fromdate}}</span> to <span class="date">{{todate}}</span> </div> <a href="#" class="edit-range-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a> </div> <div class="packages"> <div class="package-blocks clearfix"></div> </div>';

      DateRageView.prototype.serializeData = function() {
        var data;
        data = DateRageView.__super__.serializeData.call(this);
        data.fromdate = function() {
          return moment(this.from_date).format('Do-MMM');
        };
        data.todate = function() {
          return moment(this.to_date).format('Do-MMM');
        };
        return data;
      };

      DateRageView.prototype.itemView = SingleTariff;

      DateRageView.prototype.itemViewContainer = '.package-blocks';

      return DateRageView;

    })(Marionette.CompositeView);
    return Views.DateRangeCollectionView = (function(_super) {
      __extends(DateRangeCollectionView, _super);

      function DateRangeCollectionView() {
        return DateRangeCollectionView.__super__.constructor.apply(this, arguments);
      }

      DateRangeCollectionView.prototype.className = 'tariff clearfix';

      DateRangeCollectionView.prototype.itemView = DateRageView;

      DateRangeCollectionView.prototype.itemViewOptions = function(item, index) {
        var dateRangeId, getTariff, plans, roomId, tariffCollection, tariffs;
        dateRangeId = item.get('id');
        tariffs = App.request("get:tariffs:for:daterange", dateRangeId);
        plans = App.request("get:plans:collection");
        tariffCollection = new Backbone.Collection;
        getTariff = function(planId) {
          var tariff;
          tariff = _.filter(tariffs, function(t) {
            return t.get('plan_id') === planId && t.get('daterange_id') === dateRangeId;
          });
          if (tariff.length > 0) {
            return tariff[0];
          }
          return false;
        };
        roomId = Marionette.getOption(this, 'roomId');
        plans.each((function(_this) {
          return function(plan, index) {
            var tariff;
            tariff = getTariff(plan.get('id'));
            if (tariff === false) {
              tariff = new Backbone.Model;
              tariff.set({
                plan_id: plan.get('id'),
                daterange_id: dateRangeId,
                room_id: roomId
              });
              tariff.name = 'tariff';
            }
            return tariffCollection.add(tariff);
          };
        })(this));
        return {
          collection: tariffCollection
        };
      };

      return DateRangeCollectionView;

    })(Marionette.CollectionView);
  });
});
