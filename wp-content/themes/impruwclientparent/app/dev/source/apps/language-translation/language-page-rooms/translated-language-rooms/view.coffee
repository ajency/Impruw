define ['app'
		'text!apps/language-translation/language-page-rooms/translated-language-rooms/templates/translatedroomsview.html'], (App, translatedroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.TranslatedItemView extends Marionette.ItemView

                    template : translatedroomsviewTpl

                    events:
                    	"click #btn_update-translated-rooms" : "updateRoomPost"

                   	updateRoomPost:(e)->
                   		e.preventDefault()
                   		newRoomTitle = @$el.find('#translated-room-title').val()
                   		newRoomDesc = @$el.find('#translated-room-desc').val()
                   		roomId = @$el.find('#translated-room-id').val()
                   		@trigger "translated:room:updated", newRoomTitle, newRoomDesc, roomId 

                    onRoomDataUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t("Room Details updated")+'</div>')
                      @$el.find('.alert').fadeOut 5000                      
