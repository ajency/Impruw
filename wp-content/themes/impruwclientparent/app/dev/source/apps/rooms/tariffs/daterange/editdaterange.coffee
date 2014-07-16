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
                        if moment( data.to_date ).isAfter( data.from_date ) is true
                            check = @checkDaterangeValid data
                            if check is 0
                                @$el.parent().find( '.alert' ).remove()
                                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Date range overlaps existing date range" ) + "</div>"
                            else
                                @trigger "update:daterange:details", data
                        else
                            @$el.parent().find( '.alert' ).remove()
                            @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Select valid daterange" ) + "</div>"

                'click #btn_deletedaterange': (e) ->
                    e.preventDefault()
                    if confirm _.polyglot.t 'All plans with date range deleted confirm'
                        @trigger "delete:daterange", @model

            checkDaterangeValid : ( selectedDate )->
                temp = 0;

                daterangeCollection = App.request "get:daterange:collection"

                _.each daterangeCollection.models, ( daterangeModel, index ) =>
                    dateRangeModelId =  @model.get 'id'
                    dateRangeId=daterangeModel.get 'id'

                    if dateRangeModelId != dateRangeId

                        fromDate = daterangeModel.get 'from_date'
                        toDate = daterangeModel.get 'to_date'

                        fromDate = moment( fromDate ).subtract( 'days', 1 )
                        toDate = moment( toDate ).add( 'days', 1 )

                        fromDateCheck = moment( selectedDate.from_date ).isAfter( fromDate )
                        toDateCheck = moment( selectedDate.to_date ).isBefore( toDate )

                        if fromDateCheck is true and toDateCheck is false
                            temp = temp + 1
                        else
                            temp = 0
                temp

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