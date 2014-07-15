define ['app'
        'text!apps/rooms/edit/templates/edit-room.html'
        'jqueryvalidate'],
(App, addRoomTpl ,  jqueryvalidate)->
    App.module 'RoomsApp.Edit.View', (View, App, Backbone, Marionette, $, _)->
        class View.EditRoomLayout extends Marionette.Layout

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

            onShow: ->
                #@$el.scrollSections()
                @$el.find( 'form' ).validationOptions()

                # set affix
                @$el.find('*[data-spy="affix"]').affix()

                # affix width
                w = $('.aj-imp-right').width()
                @$el.find('*[data-spy="affix"]').width(w)

                m = $('.aj-imp-left').width()
                @$el.find('*[data-spy="affix"]').css('margin-left', m)

                @$el.find('.currency' ).text Marionette.getOption @, 'currency'

            validationOptions : ->
                rules :
                    no_of_rooms :
                        number : true

                messages :
                    no_of_rooms : 'Enter valid url'

            onShowSuccessMessage: ->
                @$el.find('.alert').remove()
                @$el.prepend "<div class=\"alert alert-success\">" + _.polyglot.t("Room updated successfully") + "</div>"
                #@$el.find('#btn_resetroom').click()
                $('html, body').animate
                    scrollTop: 0
                , 1000

            onSetSliderId: (slider_id)->
                @$el.find('input[name="slider_id"]').val slider_id

            regions:
                facilitiesRegion: '#facilities-region'
                galleryRegion: '#gallery-region'
                roomTariffRegion: '#room-tariff-region'
                roomBookingRegion: '#room-booking-region'