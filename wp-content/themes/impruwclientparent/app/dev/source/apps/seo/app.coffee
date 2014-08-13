define [
    'app'
    'apps/seo/show/controller'
], (App)->
    App.module 'SeoApp', (SeoApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class SeoApp.Router extends Marionette.AppRouter

            appRoutes:
                'seo': 'show'

        #public API
        API =
            show: ()->
                App.execute "show:seo",
                    region : App.rightRegion


        SeoApp.on 'start' : ->
            new SeoApp.Router
                controller : API