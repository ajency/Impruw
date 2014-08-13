define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomDescription.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomDescriptionView extends Marionette.ItemView

            className: 'roomdescription'

            template: '<div class="room-description-container clearfix">
            							<div class="room-description">
            								<h1>{{#polyglot}}Room Description{{/polyglot}}</h1>
            								<div class="room-description-desc">{{#polyglot}}This will display the room description{{/polyglot}}</div>
            							</div>
            						</div>'

            onShow:->
                @$el.attr "data-content", ""+_.polyglot.t('Update room information')+" <a href='#{SITEURL}/dashboard/#/rooms'>"+_.polyglot.t('here')+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'
   	



		