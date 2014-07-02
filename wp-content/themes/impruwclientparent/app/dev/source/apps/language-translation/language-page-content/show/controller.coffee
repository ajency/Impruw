define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/show/view'
        'apps/language-translation/language-page-content/original-page-content/controller'
        'apps/language-translation/language-page-content/translated-page-content/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent', (LanguagePageContent, App, Backbone, Marionette, $, _)->
        class LanguagePageContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                @languagePageContentLayout = @_getPageContentLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @languagePageContentLayout,
                    loading: true


                @listenTo @languagePageContentLayout, 'show',=>
                    App.execute "original:page:content:app",
                        region: @languagePageContentLayout.originalPageContent,
                        editLang : @editLang
                        pageId : @pageId

                    App.execute "translated:page:content:app",
                        region: @languagePageContentLayout.translatedPageContent,
                        editLang : @editLang
                        pageId : @pageId

            _getPageContentLayout : ->
                new LanguagePageContent.Views.LanguagePageContentLayout


        App.commands.setHandler "show:language:page:content:app", (opts = {}) ->
            new LanguagePageContent.Controller opts