define ['app'
        'text!apps/builder/site-builder/elements/roombooking/template/mainTpl.html'], (App, mainTpl)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomBooking.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomBookingView extends Marionette.ItemView

            className: 'roombooking'

            template: mainTpl

            onShow: ->
                @$el.find '#room-booking-calendar'
                .datepicker
                        inline: true
                        numberOfMonths: 2
                        dateFormat: 'yy-mm-dd'

                @$el.attr "data-content", "Please visit <a href='#url'>to update room bookings</a> "
                @$el.popover
                    html : true
                    placement : 'top'