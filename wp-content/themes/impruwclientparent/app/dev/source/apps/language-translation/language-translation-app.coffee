define ['app'
        'apps/language-translation/show/language-translation-show'
        'apps/language-translation/language-selection/controller'
        'apps/language-translation/language-translate/controller'], (App)->

    App.module 'LanguageApp', (LanguageApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false
        class LanguageApp.Router extends Marionette.AppRouter

            appRoutes:
                'language': 'show'

        #public API
        API =
            show: ()->
                new LanguageApp.Show.Controller
                                        region : App.rightRegion


        LanguageApp.on 'start': ->
            new LanguageApp.Router
                        controller: API