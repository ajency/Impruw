define [
    'app'
    'apps/billing/show/controller'], (App)->
    App.module 'BillingApp', (BillingApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class BillingApp.Router extends Marionette.AppRouter

            appRoutes:
                'billing': 'show'


        #public API
        API =
            show: ()->
                new BillingApp.Show.Controller
                    region: App.rightRegion


        BillingApp.on 'start': ->
            new BillingApp.Router
                controller: API

        App.commands.setHandler "show:billing:app", ->
            API.show()