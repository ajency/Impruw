define [ 'app', 'controllers/base-controller',
         'text!apps/rooms/tariffs/daterange/templates/addDaterange.html' ], ( App, AppController, addDateRangeTpl )->
    App.module "RoomsApp.RoomsTariff.DateRange.Add", ( Add, App )->
        class AddDateRangeController extends AppController

            initialize : ()->
                @dateRangeView = dateRangeView = @_getAddDateRangeView()

                @listenTo dateRangeView, "add:daterange:details", ( data )=>
                    dateRange = App.request "create:new:daterange:model", data
                    dateRange.save null,
                        wait : true
                        success : @dateRangeSaved

                @show dateRangeView,
                    loading : true

            dateRangeSaved : ( dateRange )=>
                App.execute "add:daterange", dateRange
                @dateRangeView.triggerMethod "saved:daterange"
                App.vent.trigger "daterange:added"

            # get the packages view
            _getAddDateRangeView : ->
                new AddDateRangeView

        # Edti DateRange view
        class AddDateRangeView extends Marionette.ItemView

            tagName : 'form'

            className : 'form-horizontal'

            template : addDateRangeTpl

            dialogOptions :
                modal_title : _.polyglot.t 'Add DateRange'
                modal_size : 'medium-modal'

            events :
                'click #btn_savedaterange' : ->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        if moment( data.to_date ).isAfter( data.from_date ) is true
                            check = @checkDaterangeValid data
                            if check is 0
                                @$el.parent().find( '.alert' ).remove()
                                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Date range overlaps existing date range" ) + "</div>"
                            else
                                @trigger "add:daterange:details", data
                        else
                            @$el.parent().find( '.alert' ).remove()
                            @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "Select valid daterange" ) + "</div>"

            checkDaterangeValid : ( selectedDate )->
                temp = 1

                daterangeCollection = App.request "get:daterange:collection"

                if daterangeCollection.models.length is 0
                    temp =1
                else
                    for daterangeModel in daterangeCollection.models
                        fromDate = daterangeModel.get 'from_date'
                        toDate = daterangeModel.get 'to_date'

                        fromDate = moment( fromDate ).subtract( 'days', 1 )
                        toDate = moment( toDate ).add( 'days', 1 )
                        console.info fromDate, toDate
                        # fromDateCheck = moment( selectedDate.from_date ).isAfter( fromDate )
                        # toDateCheck = moment( selectedDate.to_date ).isBefore( toDate )

                        if ( moment( selectedDate.from_date ).isBefore( fromDate ) and moment( selectedDate.to_date ).isAfter( toDate ) ) or ( moment( selectedDate.from_date ).isAfter( fromDate ) and moment( selectedDate.from_date ).isBefore( toDate ) ) or ( moment( selectedDate.from_date ).isBefore( fromDate ) and moment( selectedDate.to_date ).isAfter( fromDate ))
                            temp = 0
                            break

                temp



            onSavedDaterange : ->
                @$el.parent().find( '.alert' ).remove()
                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "New Date range added" ) + "</div>"
                @$el.find( 'input' ).val ''
                @$el.find( '.dated' ).datepicker 'destroy'
                @displayDatePicker()

            displayDatePicker : ->
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



            # show checkbox
            onShow : ->
                @$el.find( 'input[type="checkbox"]' ).radiocheck()
                @$el.find( '#daterange_colour' ).minicolors()
                @displayDatePicker()


            disableDateRange : ( date ) =>
                dateRangeName = App.request "get:daterange:name:for:date", date
                className = _.slugify dateRangeName
                if dateRangeName is ''
                    return [ true, className ]
                else
                    return [ false, className ]

            setDateRangeColorDelayed : ( input, instance )=>
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
                    $( ".#{className}" ).css( { "background-color" : dateRangeColour } )

            displayColorMonthChange : ( year, month, inst ) =>
                _.delay =>
                    @setDateRangeColor()
                , 10

        # handler
        App.commands.setHandler "show:add:daterange", ()->
            new AddDateRangeController
                region : App.dialogRegion