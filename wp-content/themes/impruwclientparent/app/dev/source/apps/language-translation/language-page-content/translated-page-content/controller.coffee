define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedPage', (TranslatedPage, App, Backbone, Marionette, $, _)->

        class TranslatedPage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page collection
                @pageModel =  App.request "get:page:by:language" , @pageId , @editLang

                #get page element collection

                @pageElementsCollection = App.request "get:page:elements" , @pageId
                console.log @pageElementsCollection

                @translatedContentView = @_getLanguageView @pageModel , @pageElementsCollection

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(model, collection)->
                new TranslatedPage.Views.TranslatedPageView
                    model:model
                    collection: collection

        App.commands.setHandler "translated:page:content:app", (opts) ->
            new TranslatedPage.Controller opts