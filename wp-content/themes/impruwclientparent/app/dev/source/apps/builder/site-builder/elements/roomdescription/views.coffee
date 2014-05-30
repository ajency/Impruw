define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomDescription.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomDescriptionView extends Marionette.ItemView

            className: 'roomdescription'

            template: '<div class="room-description-container clearfix">
            							<div class="room-description">
            								<h1>Room Description</h1>
            								<div class="room-description-desc">Lorem Ipsum is simply dummy text of the printing
            								and typesetting industry. Lorem Ipsum has been the industry\'s
            								standard dummy text ever since the 1500s, when an unknown printer
            								took a galley of type and scrambled it to make a type specimen book.</div>
            							</div>
            						</div>'

            onShow:->
                @$el.attr "data-content", "Please visit <a href='#url'>to update room description</a> "
                @$el.popover
                    html : true
                    placement : 'top'
   	



		