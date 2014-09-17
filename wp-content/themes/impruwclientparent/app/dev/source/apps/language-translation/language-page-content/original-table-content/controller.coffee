define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-table-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalTable', (OriginalTable, App, Backbone, Marionette, $, _)->

        class OriginalTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page element collection
                @pageTableCollection = App.request "get:page:table:elements" , @pageId , @editLang

                @originalContentView = @_getLanguageView @pageTableCollection

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(collection)->
                #TODO pass default language
                new OriginalTable.Views.OriginalTableView
                    collection: collection

        App.commands.setHandler "original:table:content:app", (opts) ->
            new OriginalTable.Controller opts
