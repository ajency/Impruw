define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalPage', (OriginalPage, App, Backbone, Marionette, $, _)->

        class OriginalPage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page collection
                @pageModel = pageModel = App.request "get:default:page" , @pageId

                @originalContentView = @_getLanguageView @pageModel

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(model)->
                new OriginalPage.Views.OriginalPageItemView
                    model:model

        App.commands.setHandler "original:page:content:app", (opts = {}) ->
            new OriginalPage.Controller opts