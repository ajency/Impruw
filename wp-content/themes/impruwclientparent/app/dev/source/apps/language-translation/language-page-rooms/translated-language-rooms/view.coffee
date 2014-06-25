define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class TranslatedItemView extends Marionette.ItemView

                    tagName: "div"

                    template : '<h1>Translated Content</h1>'