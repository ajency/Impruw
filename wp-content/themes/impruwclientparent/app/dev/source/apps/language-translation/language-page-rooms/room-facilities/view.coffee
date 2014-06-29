define ['app'
		'text!apps/language-translation/language-page-rooms/room-facilities/templates/roomfacilitiesview.html'], (App, roomfacilitiesviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.RoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class RoomFacilitiesItemView extends Marionette.ItemView

                    template : roomfacilitiesviewTpl


                class Views.RoomFacilitiesView extends Marionette.CollectionView

                    tagName : 'div'

                    className : 'form-group dual'

                    itemView : RoomFacilitiesItemView
