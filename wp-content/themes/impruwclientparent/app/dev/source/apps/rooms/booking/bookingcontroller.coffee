define [ 'app', 'controllers/base-controller'
         'apps/rooms/booking/views' ], ( App, AppController )->
   App.module 'RoomsApp.Booking', ( Booking, App, Backbone, Marionette, $, _ )->
      class Booking.Controller extends AppController

         initialize : ( options )->
            {roomId} = options

            @options = options

            @bookings = App.request "fetch:room:bookings", roomId

            @layout = layout = @getRoomBookingLayout( @bookings )

            @listenTo layout, "show", @showBookingCalendarView

            @bindAddDateRangeEventListener()

            @show layout,
               loading : true

         bindAddDateRangeEventListener : =>
#            App.vent.on "daterange:added daterange:removed daterange:updated", =>
#               console.log @options
#               App.execute "show:booking:app", @options

         showBookingCalendarView : =>
            dateRangeCollection = App.request "get:daterange:collection"

            templateHelpers =
               dateRanges : dateRangeCollection.getDateRanges()

            @cview = cview = new Booking.View.CalendarView
               templateHelpers : templateHelpers

            # listen to date selected event
            # @listenTo cview, "date:selected", @showBookingPlansView
            @listenTo cview, "change:availability", ( status, date )->
               App.execute "set:booking:status:for:date", date, status

            @layout.calendarRegion.show cview

         showBookingPlansView : ( date )=>
            plansCollection = App.request "get:plans:collection", date

            pview = new Booking.View.PlansView
               collection : plansCollection

            @layout.plansDetailsRegion.show pview

         getRoomBookingLayout : ( collection )->
            new Booking.View.BookingRoomLayout
               collection : collection


      App.commands.setHandler "show:booking:app", ( opts )->
         new Booking.Controller opts
								