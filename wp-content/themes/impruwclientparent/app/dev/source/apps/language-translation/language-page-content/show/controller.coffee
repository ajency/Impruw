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
                @originalId = opts.originalId

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
                        pageId : @originalId


                    #always pass same id as original id so that original and translated app are in sync
                    App.execute "translated:page:content:app",
                        region: @languagePageContentLayout.translatedPageContent,
                        editLang : @editLang
                        pageId :  @pageId
                        originalId : @originalId

            _getPageContentLayout : ->
                new LanguagePageContent.Views.LanguagePageContentLayout


        App.commands.setHandler "show:language:page:content:app", (opts = {}) ->
            new LanguagePageContent.Controller opts