define ['app', 'controllers/base-controller',
        'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'], (App, AppController, editDateRangeTpl)->
    App.module "RoomsApp.RoomsTariff.DateRange.Edit", (Edit, App)->
        class EditDateRangeController extends AppController

            initialize: (opt)->
                {model} = opt

                @dateRangeView = dateRangeView = @_getEditDateRangeView model

                @listenTo dateRangeView, "update:daterange:details", (data)=>
                    model.save data
                    model.save null,
                        wait: true
                        success: @dateRangeUpdated

                @listenTo dateRangeView, "delete:daterange", (data) =>
                    model.destroy
                        allData: false
                        wait: true
                        success: @daterangeDeleted

                @show dateRangeView,
                    loading: true

            daterangeDeleted: =>
                @dateRangeView.triggerMethod "deleted:daterange"
                #refresh and show the changes on add room page
                App.vent.trigger "daterange:removed"

            dateRangeUpdated: (dateRange)=>
                @dateRangeView.triggerMethod "updated:daterange"
                #refresh and show the changes on add room page
                App.vent.trigger "daterange:updated"


            # get the packages view
            _getEditDateRangeView: (dateRange)->
                new EditDateRangeView
                    model: dateRange

        # Edti DateRange view
        class EditDateRangeView extends Marionette.ItemView

            tagName: 'form'

            className: 'form-horizontal'

            template: editDateRangeTpl

            dialogOptions:
                modal_title: _.polyglot.t 'Edit DateRange'
                modal_size: 'medium-modal'

            events:
                'click #btn_updatedaterange': ->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "update:daterange:details", data

                'click #btn_deletedaterange': (e) ->
                    e.preventDefault()
                    if confirm _.polyglot.t 'All plans with date range deleted confirm'
                        @trigger "delete:daterange", @model

            serializeData: ->
                data = super()
                data.from_date = moment(data.from_date).format "YYYY-MM-DD"
                data.to_date = moment(data.to_date).format "YYYY-MM-DD"
                data

            onUpdatedDaterange: ->
                @$el.parent().find('.alert').remove()
                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t("Updated successfully") + "</div>"
                @displayDatePicker()

            onDeletedDaterange: ->
                @trigger "dialog:close"

            # show checkbox
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('#daterange_colour').minicolors()
                @displayDatePicker()


            displayDatePicker :->

                @$el.find( '.dated' ).datepicker
                    showOtherMonths : true
                    selectOtherMonths : true
                    dateFormat : "yy-mm-dd"
                    beforeShowDay : @disableDateRange
                    beforeShow : @setDateRangeColorDelayed
                    onChangeMonthYear : @displayColorMonthChange
                .prev( '.btn' ).on 'click', ( e ) =>
                    e && e.preventDefault();
                    $( datepickerSelector ).focus()

            disableDateRange : ( date ) =>
                currentDateRange =  @model.get 'daterange_name'
                dateRangeName = App.request "get:daterange:name:for:date", date

                className = _.slugify dateRangeName
                currentDateRangeName = _.slugify currentDateRange

                if dateRangeName is ''
                    return [ true, className ]
                else if currentDateRangeName is className
                    return [ true, className ]
                else
                    return [ false, className ]

            setDateRangeColorDelayed :(input , instance)=>
                _.delay =>
                    @setDateRangeColor()
                , 10

            # sets a background color for daterange
            setDateRangeColor : =>
                daterangeCollection = App.request "get:daterange:collection"
                _.each daterangeCollection.models, ( daterangeModel, index ) =>
                    dateRangeName = daterangeModel.get 'daterange_name'
                    dateRangeColour = daterangeModel.get 'daterange_colour'
                    className = _.slugify dateRangeName
                    $(".#{className}").css({"background-color": dateRangeColour})

        # handler
        App.commands.setHandler "show:edit:daterange", (opts)->
            opts =
                region: App.dialogRegion
                model: opts.model

            new EditDateRangeController opts