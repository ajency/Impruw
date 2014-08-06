define [ 'app'
         'text!apps/rooms/add/templates/add-room.html' ],
( App, addRoomTpl )->
    App.module 'RoomsApp.Add.View', ( View, App, Backbone, Marionette, $, _ )->
        class View.AddRoomLayout extends Marionette.Layout

            added : false

            tagName : 'div'

            className : 'add-room-container'

            template : addRoomTpl

            events :
                'click #btn_saveroom' : ->
                    if @$el.find( 'form' ).valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "save:new:room", data
                    else
                        ele = @$el.find( '.field-error' ).get( 0 )
                        $.scrollTo ele

                'click .add-gallery-images' : ->
                    @trigger "show:edit:slider"

                'click .fileinput-new' : ->
                    @trigger "show:media:manager"

            onShow : ->

                #@$el.scrollSections()

                # set affix
                @$el.find( '*[data-spy="affix"]' ).affix()

                # affix width
                w = $( '.aj-imp-right' ).width()

                @$el.find( '*[data-spy="affix"]' ).width( w )

                m = $( '.aj-imp-left' ).width()

                @$el.find( '*[data-spy="affix"]' ).css( 'margin-left', m )

                @$el.find( '.currency' ).text Marionette.getOption @, 'currency'


            onShowSuccessMessage : ->
                @$el.find( '.alert' ).remove()
                message = _.polyglot.t( "New room added successfully" )

                if @added is true
                    message = _.polyglot.t "Room updated successfully"

                @$el.prepend "<div class=\"alert alert-success\">#{message}</div>"
                #@$el.find('#btn_resetroom').click()
                $( 'html, body' ).animate
                    scrollTop : 0
                , 1000

                @added = true

            onSetSliderId : ( slider_id )->
                @$el.find( 'input[name="slider_id"]' ).val slider_id

            onSetFeatureImage : ( media ) ->
                image_id = media.get 'id'
                media_size = media.get 'sizes'
                image_path = media_size.thumbnail.url
                @$el.find( '.feature-image' ).attr 'src', image_path
                @$el.find( '#feature-image-id' ).attr 'value', image_id

            regions :
                facilitiesRegion : '#facilities-region'
                galleryRegion : '#gallery-region'
                roomTariffRegion : '#room-tariff-region'
                roomBookingRegion : '#room-booking-region'