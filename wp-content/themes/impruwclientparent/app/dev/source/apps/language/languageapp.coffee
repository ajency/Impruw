define ['app', 'apps/language/show/languageshow'], (App)->

    App.module 'LanguageApp', (LanguageApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class LanguageApp.Router extends Marionette.AppRouter

            appRoutes:
                'language': 'show'

        #public API
        API =
            show: ()->
                edit = new LanguageApp.Show.Controller
                                        region : App.rightRegion


        LanguageApp.on 'start': ->
            new LanguageApp.Router
                        controller: API