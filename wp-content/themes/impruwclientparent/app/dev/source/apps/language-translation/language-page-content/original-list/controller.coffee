define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-list/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalListTable', (OriginalListTable, App, Backbone, Marionette, $, _)->

        class OriginalListTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page element collection
                @pageListTableCollection = App.request "get:list:table:elements" , @pageId , @editLang
                console.log @pageListTableCollection

                @originalContentView = @_getLanguageView @pageListTableCollection

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(collection)->
                #TODO pass default language
                new OriginalListTable.Views.OriginalListTablesView
                    collection: collection

        App.commands.setHandler "original:list:table:app", (opts) ->
            new OriginalListTable.Controller opts
