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
                        @trigger "add:daterange:details", data


            onSavedDaterange : ->
                @$el.parent().find( '.alert' ).remove()
                @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t( "New Date range added" ) + "</div>"
                @$el.find( 'input' ).val ''

            # show checkbox
            onShow : ->
                @$el.find( 'input[type="checkbox"]' ).checkbox()
                @$el.find( '#daterange_colour' ).minicolors()
                @$el.find( '.dated' ).datepicker
                    showOtherMonths : true
                    selectOtherMonths : true
                    dateFormat : "yy-mm-dd"
                    beforeShowDay : @disableDateRange
#                    beforeShow : @setDateRangeColor
                    onChangeMonthYear : @displayColorMonthChange

                .prev( '.btn' ).on 'click', ( e ) =>
                    e && e.preventDefault();
                    $( datepickerSelector ).focus()

            disableDateRange : ( date ) =>
                dateRangeName = App.request "get:daterange:name:for:date", date
                className = _.slugify dateRangeName
                if dateRangeName is ''
                    return [ true, className ]
                else
                    return [ false, className ]

            # sets a background color for daterange
            setDateRangeColor :(a,b) =>
                daterangeCollection = App.request "get:daterange:collection"
                _.each daterangeCollection.models, ( daterangeModel, index ) =>
                    dateRangeName = daterangeModel.get 'daterange_name'
                    dateRangeColour = daterangeModel.get 'daterange_colour'
                    className = _.slugify dateRangeName
                    console.log className
                    console.log dateRangeColour
                    console.log @$el.find( ".#{className}" ).html()

            displayColorMonthChange : ( year, month, inst ) =>
                _.delay =>
                    @setDateRangeColor()
                , 10

        # handler
        App.commands.setHandler "show:add:daterange", ()->
            new AddDateRangeController
                region : App.dialogRegion