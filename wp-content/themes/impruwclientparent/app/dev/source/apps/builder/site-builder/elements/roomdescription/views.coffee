define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomDescription.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomDescriptionView extends Marionette.ItemView

            className: 'roomdescription'

            template: '<div class="room-description-container clearfix">
            							<div class="room-description">
            								<h1>Room Description</h1>
            								<div class="room-description-desc">{{#polyglot}}This will display the room description you added to the room. You cannot edit your room description here. To edit the room description, go to Rooms from Dashboard and edit your room description there. The text you add there will display on the live site. You cannot add links and formatting to your room description. The format in which the text is displayed will be defined by the theme you are using. To display your check in / check out time and additional policies, drag and drop the Room Summary element to your single room page.{{/polyglot}}</div>
            							</div>
            						</div>'

            onShow:->
                @$el.attr "data-content", "Update room information <a href='#{SITEURL}/dashboard/#/rooms'>here</a> "
                @$el.popover
                    html : true
                    placement : 'top'
   	



		