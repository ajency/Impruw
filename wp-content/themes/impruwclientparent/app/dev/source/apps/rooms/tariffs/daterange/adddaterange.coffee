define ['app', 'controllers/base-controller',
        'text!apps/rooms/tariffs/daterange/templates/addDaterange.html'], (App, AppController, addDateRangeTpl)->
    App.module "RoomsApp.RoomsTariff.DateRange.Add", (Add, App)->
        class AddDateRangeController extends AppController

            initialize: ()->
                @dateRangeView = dateRangeView = @_getAddDateRangeView()

                @listenTo dateRangeView, "add:daterange:details", (data)=>
                    dateRange = App.request "create:new:daterange:model", data
                    dateRange.save null,
                        wait: true
                        success: @dateRangeSaved

                @show dateRangeView,
                    loading: true

            dateRangeSaved: (dateRange)=>
                App.execute "add:daterange", dateRange
                @dateRangeView.triggerMethod "saved:daterange"
                App.execute "show:add:room"

            # get the packages view
            _getAddDateRangeView:->
                new AddDateRangeView

        # Edti DateRange view
        class AddDateRangeView extends Marionette.ItemView

            tagName: 'form'

            className: 'form-horizontal'

            template: addDateRangeTpl

            dialogOptions:
                modal_title: 'Add DateRange'
                modal_size: 'medium-modal'

            events:
                'click #btn_savedaterange': ->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "add:daterange:details", data


            onSavedDaterange: ->
                @$el.parent().find('.alert').remove()
                @$el.parent().prepend '<div class="alert alert-success">You have added a new date range.
                										Add plans and tariff to the date range</div>'
                @$el.find('input').val ''

            # show checkbox
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('#daterange_colour').minicolors()
                @$el.find('.dated').datepicker
                    showOtherMonths: true
                    selectOtherMonths: true
                    dateFormat: "yy-mm-dd"
                    beforeShowDay: @disableDateRange

                .prev('.btn').on 'click', (e) =>
                    e && e.preventDefault();
                    $(datepickerSelector).focus();

            disableDateRange: (date) ->
                daterangeCollection = App.request "get:daterange:collection"

                time = date.getTime()

                checkDateRange = (daterange)->
                    from = daterange.get 'from_date'
                    to = daterange.get 'to_date'

                    from = moment(from).subtract('days', 1)
                    to = moment(to).add('days', 1)

                    moment(time).isAfter(from) and moment(time).isBefore(to)

                models = daterangeCollection.filter checkDateRange

                if models.length > 0
                    return [false, '']
                else
                    return [true, '']


        # handler
        App.commands.setHandler "show:add:daterange", ()->
            new AddDateRangeController
                region: App.dialogRegion