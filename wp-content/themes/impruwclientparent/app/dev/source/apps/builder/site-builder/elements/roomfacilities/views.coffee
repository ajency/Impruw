define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.RoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class RoomFacilitiesItemView extends Marionette.ItemView

            className: 'roomfacilities'

            tagName: 'li'

            template: '{{name}}'

        # Menu item view
        class EmptyView extends Marionette.ItemView

            className: 'empty-roomfacilities'

            tagName: 'li'

            template: 'No Facilities Found'

        # Menu item view
        class Views.RoomFacilitiesView extends Marionette.CompositeView

            className: 'room-facilities-container'

            template: "<div class='room-facilities-title'>
            							<h5>Room Features</h5>
            							<h4>Standard Book</h5>
            						</div>
            						<ul class='facilities clearfix'>
            						</ul>"

            itemView: RoomFacilitiesItemView

            itemViewContainer: '.facilities'

            emptyView: EmptyView

            onShow: ->
                @$el.attr "data-content", _.polyglot.t("Update room facilities")+" <a href='#{SITEURL}/dashboard/#rooms'>"+_.polyglot.t("here")+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'

		