define ['app', 'controllers/base-controller'
        'apps/language-translation/language-menus/original-menu/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageMenuContent.OriginalMenu', (OriginalMenu, App, Backbone, Marionette, $, _)->

        class OriginalMenu.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get page element collection
                @menuElementsCollection = App.request "get:site:menu:elements" , WPML_DEFAULT_LANG

                @originalMenuView = @_getMenuView @menuElementsCollection

                #function to load view
                @show @originalMenuView,
                    loading: true

            _getMenuView :(collection)->
                new OriginalMenu.Views.OriginalMenuView
                    collection: collection

        App.commands.setHandler "original:menu:app", (opts) ->
            new OriginalMenu.Controller opts