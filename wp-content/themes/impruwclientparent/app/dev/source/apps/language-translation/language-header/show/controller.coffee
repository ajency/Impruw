define ['app', 'controllers/base-controller'
        'apps/language-translation/language-header/show/view'
        'apps/language-translation/language-header/original-header/controller'
        'apps/language-translation/language-header/translated-header/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguageHeaderContent', (LanguageHeaderContent, App, Backbone, Marionette, $, _)->
        class LanguageHeaderContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                @languageHeaderContentLayout = @_getHeaderContentLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @languageHeaderContentLayout,
                    loading: true


                @listenTo @languageHeaderContentLayout, 'show',=>
                    App.execute "original:header:app",
                        region: @languageHeaderContentLayout.originalHeaderContent,
                        editLang : @editLang

                    App.execute "translated:header:app",
                        region: @languageHeaderContentLayout.translatedHeaderContent,
                        editLang : @editLang

            _getHeaderContentLayout : ->
                new LanguageHeaderContent.Views.LanguageHeaderContentLayout


        App.commands.setHandler "show:header:content:app", (opts = {}) ->
            new LanguageHeaderContent.Controller opts