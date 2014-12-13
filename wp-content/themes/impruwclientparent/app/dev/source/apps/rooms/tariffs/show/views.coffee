# , 'apps/rooms/tariffs/show/templates/'

define ['app', 'moment'], (App, moment)->
    App.module "RoomsApp.RoomsTariff.Show.Views", (Views, App)->

        # package single view
        class PackageSingle extends Marionette.ItemView

            className: 'package-block-outer'

            template: '<div class="block clearfix">
                            <h6>{{planname}}</h6>
                            <div class="package-desc">
                                {{plandescription}}
                            </div>
                            <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit{{/polyglot}}</a>
                        </div>'

            modelEvents:
                "change": "render"


            events:
                'click .edit-pkg-link': (e) ->
                    e.preventDefault()
                    App.execute "show:edit:plan", model: @model

            serializeData: ->
                data = super()
                data.planname = ->
                    _(@plan_name).prune(25)
                data.plandescription = ->
                    _(@plan_description).prune(35)

                data

        # packages view
        class Views.PackagesView extends Marionette.CompositeView

            className: 'tariff package-names clearfix'

            template: '<div class="packages">
                            <div class="package-blocks header clearfix"></div>
                            <button type="button" class="btn-add-plan">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            &nbsp;{{#polyglot}}Add Plan{{/polyglot}}</button>
                        </div>'

            itemView: PackageSingle

            itemViewContainer: '.package-blocks'


        ################ Tariffs views ###################

        class SingleTariff extends Marionette.ItemView

            className: 'package-block-outer'

            events:
                'click .edit-trariff': ->
                    App.execute "show:edit:tariff", model: @model
                'click .add-trariff': ->
                    App.execute "show:add:tariff", model: @model

                'click .edit-pkg-link': (e) ->
                    e.preventDefault()
                    App.execute "show:edit:plan", model: @plan

            modelEvents:
                'change': 'render'

            initialize: ->
                @plan = App.request "get:plan:by:id", @model.get 'plan_id'
                @listenTo @plan, "change", @render

                if @model.get('weekday')? and not @model.get('weekday')['enable']?
                  weekday = @model.get('weekday')
                  weekday.enable = true;
                  @model.set 'weekday', weekday
                if @model.get('weekend')? and not @model.get('weekend')['enable']?
                  weekend = @model.get('weekend')
                  weekend.enable = true;
                  @model.set 'weekend', weekend


            serializeData: ->
                data = super()
                data.currency = Marionette.getOption @, 'currency'
                data.plan_name = @plan.get 'plan_name'
                data.plan_description = @plan.get 'plan_description'
                if data.id?
                  data.isFullweek = true if _.toBoolean(@model.get('weekday')['enable']) and _.toBoolean @model.get('weekend')['enable']
                  data.isWeekday = true if _.toBoolean @model.get('weekday')['enable']
                  data.isWeekend = true if _.toBoolean @model.get('weekend')['enable']
                data

            template: '
                        {{^id}}
                           <div class="package-header">
                                 <h6>{{plan_name}}</h6>
                                 <div class="package-desc">
                                    {{plan_description}}
                                 </div>
                                 <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit Plan{{/polyglot}}</a>
                           </div>

                           <div class="block clearfix not-yet-added empty">

                              <span class="no-data">
                                 <span class="glyphicon glyphicon-exclamation-sign"></span>
                              </span>{{#polyglot}}No Data Added{{/polyglot}}
                              <div class="block-action">
                                 <button type="button" class="btn btn-default btn-sm add-trariff edit-tran">
                                    <span class="glyphicon glyphicon-pencil"></span>&nbsp;{{#polyglot}}Add{{/polyglot}}
                                 </button>
                              </div>
                           </div>
                        {{/id}}
                        {{#id}}
                           <div class="package-header">
                              <h6>{{plan_name}}</h6>
                              <div class="package-desc">
                                 {{plan_description}}
                              </div>
                              <a href="#" class="edit-pkg-link"><span class="glyphicon glyphicon-pencil"></span>{{#polyglot}}Edit Plan{{/polyglot}}</a>
                           </div>
                           <div class="block clearfix {{^isFullweek}}common-plan{{/isFullweek}}">
                              {{#isWeekday}}<div class="weekday">
                                 {{#isFullweek}}{{#polyglot}}Weekdays{{/polyglot}}{{/isFullweek}}
                                 <span class="price">{{currency}}&nbsp;{{weekday.charge}}</span>
                              </div>{{/isWeekday}}
                              {{#isWeekend}}<div class="weekend">
                                 {{#isFullweek}}{{#polyglot}}Weekends{{/polyglot}}{{/isFullweek}}
                                 <span class="price">{{currency}}&nbsp;{{weekend.charge}}</span>
                              </div>{{/isWeekend}}
                              <div class="tariff-label clearfix">{{#polyglot}}Extra Adult{{/polyglot}}</div>
                              {{#isWeekday}}<div class="weekday">
                                 <span class="price">{{currency}}&nbsp;{{weekday.extra_adult}}</span>
                              </div>{{/isWeekday}}
                              {{#isWeekend}}<div class="weekend">
                                 <span class="price">{{currency}}&nbsp;{{weekend.extra_adult}}</span>
                              </div>{{/isWeekend}}
                              <div class="tariff-label clearfix">{{#polyglot}}Extra Child{{/polyglot}}</div>
                              {{#isWeekday}}<div class="weekday">
                                 <span class="price">{{currency}}&nbsp;{{weekday.extra_child}}</span>
                              </div>{{/isWeekday}}
                              {{#isWeekend}}<div class="weekend">
                                 <span class="price">{{currency}}&nbsp;{{weekend.extra_child}}</span>
                              </div>{{/isWeekend}}
                              <div class="block-action">
                                 <button type="button" class="btn btn-default btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;{{#polyglot}}Edit{{/polyglot}}</button>
                              </div>
                           </div>
                        {{/id}}'


        class DateRangeView extends Marionette.CompositeView

            template: '<div class="date-range">
                           <div class="range-name">{{daterange_name}}</div>
                           <div class="from">
                              <span class="date">{{fromdate}}</span>
                              to <span class="date">{{todate}}</span>
                           </div>
                           <a href="#" class="edit-range-link"><span class="glyphicon glyphicon-pencil"></span> {{#polyglot}}Edit{{/polyglot}}</a>
                        </div>
                        <div class="packages">
                           <div class="package-blocks clearfix"></div>
                        </div>'
            events:
                'click .edit-range-link': (e)->
                    e.preventDefault()
                    App.execute "show:edit:daterange", model: @model

            initialize: ->


            onBeforeRender: ->
                dateRangeId = @model.get 'id'
                tariffs = App.request "get:tariffs:for:daterange", dateRangeId

                plans = App.request "get:plans:collection"

                tariffCollection = new Backbone.Collection

                getTariff = (planId)->
                    tariff = _.filter tariffs, (t)->
                        t.get('plan_id') is planId and t.get('daterange_id') is dateRangeId

                    return tariff[0] if tariff.length > 0
                    return false

                roomId = Marionette.getOption @, 'roomId'

                plans.each (plan, index)=>
                    tariff = getTariff plan.get 'id'

                    if tariff is false
                        tariff = new Backbone.Model
                        tariff.set
                            plan_id: plan.get 'id'
                            daterange_id: dateRangeId
                            room_id: roomId

                        tariff.name = 'tariff'

                    tariffCollection.add tariff

                @collection = tariffCollection
                @listenTo @collection, "remove add", @render

            render: ->
                #console.log @collection
                super()

            modelEvents:
                'change': 'render'

            serializeData: ->
                data = super()
                data.daterange_name = _(data.daterange_name).prune 40
                data.fromdate = ->
                    moment(@from_date).format 'Do-MMM'

                data.todate = ->
                    moment(@to_date).format 'Do-MMM'

                data

            itemViewOptions: (item, index)->
                currency = Marionette.getOption @, 'currency'
                currency: currency

            itemView: SingleTariff

            itemViewContainer: '.package-blocks'


        class Views.DateRangeCollectionView extends Marionette.CollectionView

            className: 'tariff clearfix'

            itemView: DateRangeView

            itemViewOptions: (item, index)->
                roomId = Marionette.getOption @, 'roomId'
                currency = Marionette.getOption @, 'currency'
                roomId: roomId
                currency: currency