define ['app'
        'text!apps/builder/site-builder/elements/roomtariff/template/mainTpl.html'], (App, mainTpl)->
    App.module 'SiteBuilderApp.Element.RoomTariff.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.RoomTariffView extends Marionette.ItemView

            template: mainTpl

