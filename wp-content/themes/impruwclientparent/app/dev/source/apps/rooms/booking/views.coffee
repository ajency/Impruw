define ['app'
        'text!apps/rooms/add/templates/add-room.html'],
(App, addRoomTpl)->
    App.module 'RoomsApp.Booking.View', (View, App, Backbone, Marionette, $, _)->
        class View.BookingRoomLayout extends Marionette.Layout

            className: 'row room-booking'

            template: '<div class="col-md-8 room-booking-calender" id="calendar-region"></div>
            								<div class="col-md-0 room-booking-data" id="plans-details-region"></div>'

            regions:
                calendarRegion: '#calendar-region'
                plansDetailsRegion: '#plans-details-region'


        class View.CalendarView extends Marionette.CompositeView

            template: '<h4>
                            <span class="glyphicon glyphicon-calendar"></span>
                            {{#polyglot}}Monthly Calendar{{/polyglot}}
                            <span class="excerpt">{{#polyglot}}Choose availability dates{{/polyglot}}</span>
                        </h4>
                        <div id="room-booking-calendar"></div>
                        <br><br><br>
                        <ul class="list-inline daterange-legends">
                            {{#dateRanges}}
                                <li><span class="{{class}}">&nbsp;</span>{{name}}</li>
                            {{/dateRanges}}
                        </ul>
                        '

            onShow: ->
                @$el.find '#room-booking-calendar'
                    .datepicker
                        inline: true
                        numberOfMonths: 3
                        dateFormat: 'yy-mm-dd'
                        onSelect: @triggerOnSelect
                        beforeShowDay: @highlightDaysByDateRange
                        onChangeMonthYear: @displayColorMonthChange

                @setDateRangeColor()
                @removeHightlight()

                # bind booking updated event
                App.vent.on "booking:updated", @onBookingUpdated

            onClose: ->
                @clearPrevPopover()

            displayColorMonthChange: (year, month, inst) =>
                _.delay =>
                    @setDateRangeColor()
                    @removeHightlight()
                , 10

            removeHightlight: =>
                @$el.find('#room-booking-calendar td.ui-datepicker-today a.ui-state-highlight').removeClass 'ui-state-highlight'
                @$el.find('#room-booking-calendar td.ui-datepicker-today a.ui-state-active').removeClass 'ui-state-active'

            # sets a background color for daterange
            setDateRangeColor: =>
                daterangeCollection = App.request "get:daterange:collection"
                _.each daterangeCollection.models, (daterangeModel, index) ->
                    dateRangeName = daterangeModel.get 'daterange_name'
                    dateRangeColour = daterangeModel.get 'daterange_colour'
                    className = _.slugify dateRangeName
                    $(".#{className}").css({"background-color": dateRangeColour})


            triggerOnSelect: (date, selected)=>
                @trigger "date:selected", date

                _.delay =>
                    @setDateRangeColor()
                    @showPopover(date)
                , 10

            # show popover
            showPopover: (date)=>
                self = @
                td = @$el.find('td.ui-datepicker-current-day')
                @clearPrevPopover()

                td.popover
                    content: @getAvailabilityMarkup(date)
                    html: true
                    placement: 'bottom'
                    container: 'body'

                td.on 'shown.bs.popover', (t, r, p)->
                    value = parseInt $('#booking-slider').attr 'data-value'
                    $('#booking-slider').slider
                        value: value
                        min: 0
                        max: 60
                        step: 30
                        stop: self.changeAvaliability

                td.popover 'show'

                $('.booking-popover-close').on 'click', =>
                    @clearPrevPopover()

                @popovertd = td

            changeAvaliability: (event, ui)=>
                value = 'available' if ui.value is 0
                value = 'semi-available' if ui.value is 30
                value = 'unavailable' if ui.value is 60
                dateTime = @$el.find('#room-booking-calendar').datepicker 'getDate'
                date = $.datepicker.formatDate("yy-mm-dd", dateTime)
                $('#booking-slider').slider 'disable'
                @trigger "change:availability", value, date

            onBookingUpdated: =>
                $('#booking-slider').slider 'enable'
                dateTime = @$el.find('#room-booking-calendar').datepicker 'getDate'
                status  = App.request "get:avaliability:status", dateTime
                @$el.find('td.ui-datepicker-current-day').removeClass 'semi-available'
                @$el.find('td.ui-datepicker-current-day').removeClass 'unavailable'
                @$el.find('td.ui-datepicker-current-day').removeClass 'available'
                @$el.find('td.ui-datepicker-current-day').addClass status
                
            # get availability markup
            getAvailabilityMarkup: (date)->
                #date = new Date date
                currentStatus = App.request "get:avaliability:status", date
                value = 0 if currentStatus is 'available'
                value = 30 if currentStatus is 'semi-available'
                value = 60 if currentStatus is 'unavailable'

                html = "<button type='button' class='close booking-popover-close' aria-hidden='true'>&times;</button>
                        <div class='booking-slider-pop'>
                            <div id='booking-slider' data-value='#{value}'></div>
                            <div class='row'>
                                <div class='col-md-4 available'><span>#{_.polyglot.t('Available')}</span></div>
                                <div class='col-md-4 semi-available'><span>#{_.polyglot.t('Filling Fast')}</span></div>
                                <div class='col-md-4 unavailable'><span>#{_.polyglot.t('Sold Out')}</span></div>

                            </div>
                        </div>"
                html


            # remove previous popover
            clearPrevPopover: ->
                return if not @popovertd
                $('.popover').remove()
                delete @popovertd

            # highlight days
            highlightDaysByDateRange: (date)=>
                dateRangeName = App.request "get:daterange:name:for:date", date
                range = ''
                range = if dateRangeName then true else false
                className = _.slugify dateRangeName
                className += " " + App.request "get:avaliability:status", date
                return [range, className]

        #Plans list view
        class View.PlansView extends Marionette.CompositeView

            className: 'plans-view'

            itemView: BookingPlanSingle

            emptyView: BookingPlanEmpty

            template: '<div class="date-range">
            									You have selected
            									<b>18 Jan to 16 Jan </b>
            								</div>
            								<div class="room-plans">

            								</div>'

        # booking plans single view
        class BookingPlanSingle extends Marionette.ItemView

            template: '<div class="room-booking-plan">
            									<h5>Plan 1 </h5>
            									<p>Room. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            									<div class="booking-detail">
            										Max Adults:
            										<span>02</span>
            									</div>
            									<div class="booking-detail">
            										Max Children:
            										<span>	02</span>
            									</div>
            									<div class="clearfix"></div>
            									<h6>Additional Charge</h6>
            									<div class="booking-detail">
            										per extra Adult : $200
            									</div>
            									<div class="booking-detail">
            										 per extra Child : $152
            									</div>
            									<div class="clearfix"></div>
            									<div class="booking-price">WEEKDAYS <b>$300</b></div>
            								</div>'

        # booking plans if not plans are added
        class BookingPlanEmpty extends Marionette.ItemView

            template: '<p>No Plans found for the selected date</p>'