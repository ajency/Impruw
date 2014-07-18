define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalPage', (OriginalPage, App, Backbone, Marionette, $, _)->

        class OriginalPage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page collection
                @pageModel =  App.request "get:default:page" , @pageId

                #get page element collection
                @pageElementsCollection = App.request "get:page:elements" , @pageId , @editLang
                console.log @pageElementsCollection

                @originalContentView = @_getLanguageView @pageModel , @pageElementsCollection

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(model, collection)->
                #TODO pass default language
                new OriginalPage.Views.OriginalPageView
                    model:model
                    collection: collection

        App.commands.setHandler "original:page:content:app", (opts) ->
            new OriginalPage.Controller opts