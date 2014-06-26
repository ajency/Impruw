define ['app'
		'text!apps/language-translation/language-page-rooms/translated-language-rooms/templates/translatedroomsview.html'], (App, translatedroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRooms.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.TranslatedItemView extends Marionette.ItemView

                    template : translatedroomsviewTpl