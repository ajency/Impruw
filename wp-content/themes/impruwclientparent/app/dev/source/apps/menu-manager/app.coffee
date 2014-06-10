define ['app'
        'apps/menu-manager/show/controller'
        'apps/menu-manager/list/controller'
        'apps/menu-manager/add/controller'], (App)->
    App.module 'MenuManager', (MenuManager, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class MenuManager.Router extends Marionette.AppRouter

            appRoutes:
                'menu-manager': 'show'


        #public API
        API =
            show: ()->
                new MenuManager.Show.Controller
                    region: App.dialogRegion


        App.vent.on "show:menu:manager", ->
            API.show()

        MenuManager.on "start", ->
            new MenuManager.Router
                controller: API