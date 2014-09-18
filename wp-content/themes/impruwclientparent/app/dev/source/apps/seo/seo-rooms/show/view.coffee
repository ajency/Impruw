define ['app'
        'text!apps/seo/templates/seoroomsview.html'], (App, seoroomsviewTpl)->

            App.module 'SeoApp.SeoRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.SeoRooomsLayout extends Marionette.Layout

                    template : seoroomsviewTpl

                    className : 'tab-content'

                    regions: 
                        chooseRooms: ".pick-room",
                        seoRoomContent: ".seo-room-content"


                  