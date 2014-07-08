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

                # set height 
                @$el.parent().height @model.get 'height'
                @$el.height '100%'
                @trigger 'set:image:height',
                            height : @$el.parent().height()
                            width : @$el.parent().width()

                @$el.parent().resizable
                    # helper : "ui-image-resizable-helper"
                    handles: "s"

                    stop : (evt, ui)=>
                        @$el.parent().css 'width','auto'
                        @model.set 'height',@$el.parent().height()
                        @trigger 'set:image:height' ,
                            height : @$el.parent().height()
                            width : @$el.parent().width()


                if window.ADDRESS.trim() is ''
                    @$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>Address not specified. Please<a href='#{SITEURL}/dashboard/#site-profile'> click here to add.</a></div>"
                else
                    @geoCodeAddress()



                

            geoCodeAddress:->
                address = window.ADDRESS
                geocoder = new google.maps.Geocoder()
                geocoder.geocode
                            address: address
                        , (results, status)=>
                            if status is google.maps.GeocoderStatus.OK
                                @displayMap results[0].geometry.location, address
                            else
                                @displayGeoCodeErrorMessage()

            displayMap:(location, address)->
                map = new google.maps.Map document.getElementById("map-canvas"),
                                                                center : location
                                                                zoom : 14

                @createMarker map, address

            createMarker :(map, address)->
                marker = new google.maps.Marker
                                    map: map
                                    position: map.getCenter()

                @createInfoWindow map, marker, address

            createInfoWindow:(map, marker, address)->
                # TODO: add formatted content in info window
                infowindow = new google.maps.InfoWindow
                                                content: address

                google.maps.event.addListener marker, 'click',->
                    infowindow.open map,marker

            displayGeoCodeErrorMessage:->
                @$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>Failed to geocode your address. Please click
                                     <a href='#{SITEURL}/dashboard/#site-profile'> here to update.</a></div>"