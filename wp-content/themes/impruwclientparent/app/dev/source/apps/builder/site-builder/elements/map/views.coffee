define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Map.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.MapView extends Marionette.ItemView

            className: 'map'

            id: 'map-canvas'

            template: ''

            # set the class name before element is rendered
            onShow: ->
                @className += " " + Marionette.getOption this, 'className'

                lat = parseFloat @model.get 'lat'
                lng = parseFloat @model.get 'lng'
                zoom = parseInt @model.get 'zoom'
                address = @model.get 'address'

                mapOptions =
                    zoom: zoom
                    center: new google.maps.LatLng lat, lng

                map = new google.maps.Map document.getElementById('map-canvas'), mapOptions

                marker = new google.maps.Marker
                    position: map.getCenter()
                    map: map
                    title: address