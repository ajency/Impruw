define ['app'
        'text!apps/language-translation/language-page-rooms/templates/languagepageroomsview.html'], (App, languagepageroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.PageRooomsLayout extends Marionette.Layout

                    template : languagepageroomsviewTpl

                    className : 'tab-content'

                    regions: 
                        chooseRooms: ".pick-room",
                        originalRoomContent: ".original-content",
                        translatedRoomContent: ".translated-content",
                        originalRoomFacilities: "#original-rooms-facilities",
                        translatedRoomFacilities: "#translated-rooms-facilities",
                        originalRoomDateranges: "#original-rooms-dateranges",
                        translatedRoomDateranges: "#translated-rooms-dateranges"


                  