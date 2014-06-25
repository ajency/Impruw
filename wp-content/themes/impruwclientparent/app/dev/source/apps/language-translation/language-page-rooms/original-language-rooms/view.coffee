define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class OriginalItemView extends Marionette.ItemView

                    tagName: "div"

                    template : '<h1>Original Content</h1>'