define ['app'
		'text!apps/language-translation/language-page-rooms/room-facilities/templates/roomfacilitiesview.html'], (App, roomfacilitiesviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.RoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.RoomFacilitiesView extends Marionette.ItemView

                    tagName : 'div'

                    className : 'form-group dual'

                    template : roomfacilitiesviewTpl