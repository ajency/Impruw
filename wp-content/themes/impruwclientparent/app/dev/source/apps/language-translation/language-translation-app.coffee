define ['app'
        'apps/language-translation/show/language-translation-show'
        'apps/language-translation/language-selection/controller'
        'apps/language-translation/language-page-nav/controller'
        'apps/language-translation/language-page-content/show/controller'
        'apps/language-translation/language-page-rooms/show/controller'
        'apps/language-translation/language-site-details/show/controller'
        'apps/language-translation/language-header/show/controller'
        'apps/language-translation/language-footer/show/controller'
        'apps/language-translation/language-menus/show/controller'], (App)->

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