define [
    'app'
    'apps/room-summary/show/controller'
    'apps/room-summary/checkin/controller'
    'apps/room-summary/policies/controller'
    'apps/room-summary/currency/controller'
], (App)->
    App.module 'RoomSummaryApp', (RoomSummaryApp, App, Backbone, Marionette, $, _)->
        class RoomSummaryApp.Router extends Marionette.AppRouter

            appRoutes:
                'room-summary': 'show'


        #public API
        API =
            show: ()->
                new RoomSummaryApp.Show.Controller
                    region: App.rightRegion


        RoomSummaryApp.on 'start': ->
            new RoomSummaryApp.Router
                controller: API