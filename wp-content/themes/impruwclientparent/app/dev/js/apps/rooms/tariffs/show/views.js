var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'moment'], function(App, moment) {
  return App.module("RoomsApp.RoomsTariff.Show.Views", function(Views, App) {
    var DateRangeView, PackageSingle, SingleTariff;
    PackageSingle = (function(_super) {
      __extends(PackageSingle, _super);

      function PackageSingle() {
        return PackageSingle.__super__.constructor.apply(this, arguments);
      }

      PackageSingle.prototype.className = 'package-block-outer';

      PackageSingle.prototype.template = '<div class="block clearfix"> <h6>{{planname}}</h6> <div class="package-desc"> {{plandescription}} </div> <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit{{/polyglot}}</a> </div>';

      PackageSingle.prototype.modelEvents = {
        "change": "render"
      };

      PackageSingle.prototype.events = {
        'click .edit-pkg-link': function(e) {
          e.preventDefault();
          return App.execute("show:edit:plan", {
            model: this.model
          });
        }
      };

      PackageSingle.prototype.serializeData = function() {
        var data;
        data = PackageSingle.__super__.serializeData.call(this);
        data.planname = function() {
          return _(this.plan_name).prune(25);
        };
        data.plandescription = function() {
          return _(this.plan_description).prune(35);
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

      PackagesView.prototype.template = '<div class="packages"> <div class="package-blocks header clearfix"></div> <button type="button" class="btn-add-plan"> <span class="glyphicon glyphicon-plus-sign"></span> &nbsp;{{#polyglot}}Add Plan{{/polyglot}}</button> </div>';

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
        },
        'click .edit-pkg-link': function(e) {
          e.preventDefault();
          return App.execute("show:edit:plan", {
            model: this.plan
          });
        }
      };

      SingleTariff.prototype.modelEvents = {
        'change': 'render'
      };

      SingleTariff.prototype.initialize = function() {
        var weekday, weekend;
        this.plan = App.request("get:plan:by:id", this.model.get('plan_id'));
        this.listenTo(this.plan, "change", this.render);
        if ((this.model.get('weekday') != null) && (this.model.get('weekday')['enable'] == null)) {
          weekday = this.model.get('weekday');
          weekday.enable = true;
          this.model.set('weekday', weekday);
        }
        if ((this.model.get('weekend') != null) && (this.model.get('weekend')['enable'] == null)) {
          weekend = this.model.get('weekend');
          weekend.enable = true;
          return this.model.set('weekend', weekend);
        }
      };

      SingleTariff.prototype.serializeData = function() {
        var data;
        data = SingleTariff.__super__.serializeData.call(this);
        data.currency = Marionette.getOption(this, 'currency');
        data.plan_name = this.plan.get('plan_name');
        data.plan_description = this.plan.get('plan_description');
        if (data.id != null) {
          if (_.toBoolean(this.model.get('weekday')['enable']) && _.toBoolean(this.model.get('weekend')['enable'])) {
            data.isFullweek = true;
          }
          if (_.toBoolean(this.model.get('weekday')['enable'])) {
            data.isWeekday = true;
          }
          if (_.toBoolean(this.model.get('weekend')['enable'])) {
            data.isWeekend = true;
          }
        }
        return data;
      };

      SingleTariff.prototype.template = '{{^id}} <div class="package-header"> <h6>{{plan_name}}</h6> <div class="package-desc"> {{plan_description}} </div> <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit Plan{{/polyglot}}</a> </div> <div class="block clearfix not-yet-added empty"> <span class="no-data"> <span class="glyphicon glyphicon-exclamation-sign"></span> </span>{{#polyglot}}No Data Added{{/polyglot}} <div class="block-action"> <button type="button" class="btn btn-default btn-sm add-trariff edit-tran"> <span class="glyphicon glyphicon-pencil"></span>&nbsp;{{#polyglot}}Add{{/polyglot}} </button> </div> </div> {{/id}} {{#id}} <div class="package-header"> <h6>{{plan_name}}</h6> <div class="package-desc"> {{plan_description}} </div> <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit Plan{{/polyglot}}</a> </div> <div class="block clearfix {{^isFullweek}}common-plan{{/isFullweek}}"> {{#isWeekday}}<div class="weekday"> {{#isFullweek}}{{#polyglot}}Weekdays{{/polyglot}}{{/isFullweek}} <span class="price">{{currency}}&nbsp;{{weekday.charge}}</span> </div>{{/isWeekday}} {{#isWeekend}}<div class="weekend"> {{#isFullweek}}{{#polyglot}}Weekends{{/polyglot}}{{/isFullweek}} <span class="price">{{currency}}&nbsp;{{weekend.charge}}</span> </div>{{/isWeekend}} <div class="tariff-label clearfix">{{#polyglot}}Extra Adult{{/polyglot}}</div> {{#isWeekday}}<div class="weekday"> <span class="price">{{currency}}&nbsp;{{weekday.extra_adult}}</span> </div>{{/isWeekday}} {{#isWeekend}}<div class="weekend"> <span class="price">{{currency}}&nbsp;{{weekend.extra_adult}}</span> </div>{{/isWeekend}} <div class="tariff-label clearfix">{{#polyglot}}Extra Child{{/polyglot}}</div> {{#isWeekday}}<div class="weekday"> <span class="price">{{currency}}&nbsp;{{weekday.extra_child}}</span> </div>{{/isWeekday}} {{#isWeekend}}<div class="weekend"> <span class="price">{{currency}}&nbsp;{{weekend.extra_child}}</span> </div>{{/isWeekend}} <div class="block-action"> <button type="button" class="btn btn-default btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;{{#polyglot}}Edit{{/polyglot}}</button> </div> </div> {{/id}}';

      return SingleTariff;

    })(Marionette.ItemView);
    DateRangeView = (function(_super) {
      __extends(DateRangeView, _super);

      function DateRangeView() {
        return DateRangeView.__super__.constructor.apply(this, arguments);
      }

      DateRangeView.prototype.template = '<div class="date-range"> <div class="range-name">{{daterange_name}}</div> <div class="from"> <span class="date">{{fromdate}}</span> to <span class="date">{{todate}}</span> </div> <a href="#" class="edit-range-link"><span class="glyphicon glyphicon-pencil"></span> {{#polyglot}}Edit{{/polyglot}}</a> </div> <div class="packages"> <div class="package-blocks clearfix"></div> </div>';

      DateRangeView.prototype.events = {
        'click .edit-range-link': function(e) {
          e.preventDefault();
          return App.execute("show:edit:daterange", {
            model: this.model
          });
        }
      };

      DateRangeView.prototype.initialize = function() {};

      DateRangeView.prototype.onBeforeRender = function() {
        var dateRangeId, getTariff, plans, roomId, tariffCollection, tariffs;
        dateRangeId = this.model.get('id');
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
        this.collection = tariffCollection;
        return this.listenTo(this.collection, "remove add", this.render);
      };

      DateRangeView.prototype.render = function() {
        return DateRangeView.__super__.render.call(this);
      };

      DateRangeView.prototype.modelEvents = {
        'change': 'render'
      };

      DateRangeView.prototype.serializeData = function() {
        var data;
        data = DateRangeView.__super__.serializeData.call(this);
        data.daterange_name = _(data.daterange_name).prune(40);
        data.fromdate = function() {
          return moment(this.from_date).format('Do-MMM');
        };
        data.todate = function() {
          return moment(this.to_date).format('Do-MMM');
        };
        return data;
      };

      DateRangeView.prototype.itemViewOptions = function(item, index) {
        var currency;
        currency = Marionette.getOption(this, 'currency');
        return {
          currency: currency
        };
      };

      DateRangeView.prototype.itemView = SingleTariff;

      DateRangeView.prototype.itemViewContainer = '.package-blocks';

      return DateRangeView;

    })(Marionette.CompositeView);
    return Views.DateRangeCollectionView = (function(_super) {
      __extends(DateRangeCollectionView, _super);

      function DateRangeCollectionView() {
        return DateRangeCollectionView.__super__.constructor.apply(this, arguments);
      }

      DateRangeCollectionView.prototype.className = 'tariff clearfix';

      DateRangeCollectionView.prototype.itemView = DateRangeView;

      DateRangeCollectionView.prototype.itemViewOptions = function(item, index) {
        var currency, roomId;
        roomId = Marionette.getOption(this, 'roomId');
        currency = Marionette.getOption(this, 'currency');
        return {
          roomId: roomId,
          currency: currency
        };
      };

      return DateRangeCollectionView;

    })(Marionette.CollectionView);
  });
});
