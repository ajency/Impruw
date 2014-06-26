define ['app'
		'text!apps/language-translation/language-page-rooms/original-language-rooms/templates/originalroomsview.html'], (App, originalroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.OriginalItemView extends Marionette.ItemView

                    template : originalroomsviewTpl