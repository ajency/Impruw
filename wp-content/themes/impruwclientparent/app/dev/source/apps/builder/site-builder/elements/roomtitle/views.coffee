define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomTitle.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomTitleView extends Marionette.ItemView

            className: 'roomtitle'

            template: '<div class="room-title-container clearfix">
            							<div class="room-title">
            								<h1>Your Room Title</h1>
            								<div class="room-title-desc">This will work only on a single room page. Change your page to the single room page and add this element. The room title of the room will display on your website. <br>
                                                Also to make the "Booking and Availability" button work, use the Room Booking element. When the button is pressed on your site, it will take you to the booking area.
                                            </div>
            							</div>
            							<div class="room-title-actions">
            								<button class="btn btn-sm btn-book">Booking &amp; Availability</button>
            							</div>
            						</div>'