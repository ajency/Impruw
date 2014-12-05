define ['app', 'controllers/base-controller'
        'apps/language-translation/language-menus/show/view'
        'apps/language-translation/language-menus/original-menu/controller'
        'apps/language-translation/language-menus/translated-menu/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguageMenuContent', (LanguageMenuContent, App, Backbone, Marionette, $, _)->
        class LanguageMenuContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                @languageMenuContentLayout = @_getMenuContentLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @languageMenuContentLayout,
                    loading: true


                @listenTo @languageMenuContentLayout, 'show',=>
                    App.execute "original:menu:app",
                        region: @languageMenuContentLayout.originalMenuContent,
                        editLang : @editLang

                    App.execute "translated:menu:app",
                        region: @languageMenuContentLayout.translatedMenuContent,
                        editLang : @editLang

            _getMenuContentLayout : ->
                new LanguageMenuContent.Views.LanguageMenuContentLayout


        App.commands.setHandler "show:menu:content:app", (opts = {}) ->
            new LanguageMenuContent.Controller opts