define ['app', 'controllers/base-controller'
        'apps/language-translation/language-footer/show/view'
        'apps/language-translation/language-footer/original-footer/controller'
        'apps/language-translation/language-footer/translated-footer/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguageFooterContent', (LanguageFooterContent, App, Backbone, Marionette, $, _)->
        class LanguageFooterContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                @languageFooterContentLayout = @_getFooterContentLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @languageFooterContentLayout,
                    loading: true


                @listenTo @languageFooterContentLayout, 'show',=>
                    App.execute "original:footer:app",
                        region: @languageFooterContentLayout.originalFooterContent,
                        editLang : @editLang

                    App.execute "translated:footer:app",
                        region: @languageFooterContentLayout.translatedFooterContent,
                        editLang : @editLang

            _getFooterContentLayout : ->
                new LanguageFooterContent.Views.LanguageFooterContentLayout


        App.commands.setHandler "show:footer:content:app", (opts = {}) ->
            new LanguageFooterContent.Controller opts