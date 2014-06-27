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
                        languageRoomFacilities: "#js-rooms-facilities",


                  