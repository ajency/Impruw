define ['app'
        'text!apps/rooms/edit/templates/edit-room.html'
        'jquery.validate'],
(App, addRoomTpl)->
    App.module 'RoomsApp.Edit.View', (View, App, Backbone, Marionette, $, _)->
        class View.EditRoomLayout extends Marionette.LayoutView

            tagName: 'div'

            className: 'edit-room-container'

            template: addRoomTpl

            events:
                'click #btn_saveroom': ->
                    if @$el.find('form').valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "save:edit:room", data
                    else
                        ele = @$el.find('.field-error').get(0)
                        $.scrollTo ele

                'click .add-gallery-images': ->
                    @trigger "show:edit:slider"

                'click .fileinput-new' : ->
                    @trigger "show:media:manager"

            serializeData: ->
                data = super()
                data.THEMEURL = THEMEURL
                data.image_url = "http://placehold.it/300&text=" + _.polyglot.t( 'Featured Image' ) if data.image_url is false
                data


            onShow: ->
                #@$el.scrollSections()
                # set affix
                @$el.find('*[data-spy="affix"]').affix()

                # affix width
                w = $('.aj-imp-right').width()
                @$el.find('*[data-spy="affix"]').width(w)

                m = $('.aj-imp-left').width()
                @$el.find('*[data-spy="affix"]').css('margin-left', m)

                @$el.find('.currency' ).text Marionette.getOption @, 'currency'

            onShowSuccessMessage: ->
                @$el.find('.alert').remove()
                @$el.prepend "<div class=\"alert alert-success\">" + _.polyglot.t("Room updated successfully") + "</div>"
                #@$el.find('#btn_resetroom').click()
                $('html, body').animate
                    scrollTop: 0
                , 1000

            onSetSliderId: (slider_id)->
                @$el.find('input[name="slider_id"]').val slider_id

            onSetFeatureImage : ( media ) ->
                image_id = media.get 'id'
                media_size = media.get 'sizes'
                image_path = media_size.thumbnail.url
                @$el.find( '.feature-image' ).attr 'src', image_path
                @$el.find( '#feature-image-id' ).attr 'value', image_id

            regions:
                facilitiesRegion: '#facilities-region'
                galleryRegion: '#gallery-region'
                roomTariffRegion: '#room-tariff-region'
                roomBookingRegion: '#room-booking-region'