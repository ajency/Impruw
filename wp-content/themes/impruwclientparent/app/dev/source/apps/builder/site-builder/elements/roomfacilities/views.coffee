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
            							<h5>{{#polyglot}}Room Features{{/polyglot}}</h5>
            							<h4>{{#polyglot}}Standard Book{{/polyglot}}</h5>
            						</div>
            						<ul class='facilities clearfix'>
            						</ul>"

            childView: RoomFacilitiesItemView

            childViewContainer: '.facilities'

            emptyView: EmptyView

            onShow: ->
                @$el.attr "data-content", _.polyglot.t("Update room facilities")+" <a href='#{SITEURL}/dashboard/#/rooms' target='BLANK'>"+_.polyglot.t("here")+"</a> "
                @$el.popover
                    html : true
                    placement : 'top'

		