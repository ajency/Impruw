var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app'], function(App) {
  return App.module("RoomsApp.RoomsTariff.Show.Views", function(Views, App) {
    var PackageSingle, SingleTariff;
    PackageSingle = (function(_super) {
      __extends(PackageSingle, _super);

      function PackageSingle() {
        return PackageSingle.__super__.constructor.apply(this, arguments);
      }

      PackageSingle.prototype.className = 'package-block-outer';

      PackageSingle.prototype.template = '<div class="block clearfix"> <h6>{{plan_name}}</h6> <div class="package-desc"> {{plan_description}} </div> </div>';

      PackageSingle.prototype.serializeData = function() {
        var data;
        data = PackageSingle.__super__.serializeData.call(this);
        data.packagedescription = function() {
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

      SingleTariff.prototype.template = '<div class="package-block-outer"> <div class="block clearfix"> <div class="weekday"> Weekdays <span class="price">{{weekdays.charge}}</span> </div> <div class="weekend"> Weekends <span class="price">{{weekends.charge}}</span> </div> <div class="tariff-label clearfix">Extra Adult</div> <div class="weekday"> <span class="price">{{weekdays.extra_adult}}</span> </div> <div class="weekend"> <span class="price">{{weekends.extra_adult}}</span> </div> <div class="tariff-label clearfix">Extra Child</div> <div class="weekday"> <span class="price">{{weekdays.extra_child}}</span> </div> <div class="weekend"> <span class="price">{{weekends.extra_child}}</span> </div> <div class="block-action"> <button type="button" class="btn btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button> </div> </div> </div>';

      SingleTariff.prototype.onRender = function() {
        return this.$el.find('div.not-applicable').click((function(_this) {
          return function() {
            alert("dsdsds");
            return _this.trigger("show:add:tariff");
          };
        })(this));
      };

      return SingleTariff;

    })(Marionette.ItemView);
    return Views.TariffsView = (function(_super) {
      __extends(TariffsView, _super);

      function TariffsView() {
        return TariffsView.__super__.constructor.apply(this, arguments);
      }

      TariffsView.prototype.template = '';

      TariffsView.prototype.dateRangeTemplate = '<div class="date-range"> <div class="from"> <span class="date">{{startdate}}</span> to <span class="date">{{enddate}}</span> </div> </div>';

      TariffsView.prototype.dateRangeItemViewContainer = '.package-blocks';

      TariffsView.prototype.render = function() {
        var dCollection, html;
        this.isRendered = true;
        this.isClosed = false;
        this.triggerBeforeRender();
        dCollection = Marionette.getOption(this, 'dateRangeCollection');
        html = '';
        dCollection.each((function(_this) {
          return function(model) {
            return html += _this.renderDaterange(model);
          };
        })(this));
        this.$el.html(html);
        return this;
      };

      TariffsView.prototype.renderDaterange = function(model) {
        var data, html, markup, template;
        data = this.serailizeDaterangeModel(model);
        template = this.dateRangeTemplate;
        html = Marionette.Renderer.render(template, data);
        markup = '<div class="tariff clearfix">';
        markup += html;
        markup += '	<div class="packages"> <div class="package-blocks clearfix">';
        markup += this.renderTariffs(model.get('id'));
        markup += '</div> </div> </div> <hr />';
        return markup;
      };

      TariffsView.prototype.renderTariffs = function(dateRangeId) {
        var html, plans;
        plans = Marionette.getOption(this, 'planCollection');
        html = '';
        plans.each((function(_this) {
          return function(plan) {
            var tariff;
            tariff = _this.getTariff(plan.get('id'), dateRangeId);
            tariff = tariff === false ? new Backbone.Model : tariff;
            return html += _this.getTariffView(tariff);
          };
        })(this));
        return html;
      };

      TariffsView.prototype.getTariffView = function(tariff) {
        var opt, v;
        opt = {
          model: tariff
        };
        if (tariff.isNew()) {
          opt.template = '<div class="package-block-outer not-applicable"> <div class="block clearfix"> <h4>NA</h4> </div> </div>';
        }
        v = new SingleTariff(opt);
        this.listenTo(v, "show:add:tariff", (function(_this) {
          return function() {
            console.log("Dsdsds");
            return _this.trigger("itemview:show:add:tariff", v);
          };
        })(this));
        this.listenTo(v, "show:edit:tariff", (function(_this) {
          return function(model) {
            return _this.trigger("itemview:show:edit:tariff", v, model);
          };
        })(this));
        v.render();
        return v.$el.html();
      };

      TariffsView.prototype.getTariff = function(planId, dateRangeId) {
        var models;
        models = this.collection.filter(function(model) {
          return model.get('plan_id') === planId && model.get('daterange_id') === dateRangeId;
        });
        if (models.length > 0) {
          return models[0];
        }
        return false;
      };

      TariffsView.prototype.serailizeDaterangeModel = function(model) {
        var data;
        data = model.toJSON();
        data.startdate = function() {
          return moment(this.from_date).format('Do-MMM');
        };
        data.enddate = function() {
          return moment(this.to_date).format('Do-MMM');
        };
        return data;
      };

      return TariffsView;

    })(Marionette.CompositeView);
  });
});
