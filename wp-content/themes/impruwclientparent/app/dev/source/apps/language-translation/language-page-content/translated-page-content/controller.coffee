define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedPage', (TranslatedPage, App, Backbone, Marionette, $, _)->

        class TranslatedPage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                {editLang} = opts
                @editingLang = editLang

                #get page collection
                @pageModel = pageModel = App.request "get:room:entities"
                console.log @pageModel

                @translatedContentView = @_getLanguageView @pageModel

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(model)->
                new TranslatedPage.Views.TranslatedPageItemView
                    model:model

        App.commands.setHandler "translated:page:content:app", (opts) ->
            new TranslatedPage.Controller opts