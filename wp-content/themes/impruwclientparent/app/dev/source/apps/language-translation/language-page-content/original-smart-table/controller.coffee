define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-smart-table/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalSmartTable', (OriginalSmartTable, App, Backbone, Marionette, $, _)->

        class OriginalSmartTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page element collection
                @pageSmartTableCollection = App.request "get:smart:table:elements" , @pageId , @editLang

                @originalContentView = @_getLanguageView @pageSmartTableCollection

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(collection)->
                #TODO pass default language
                new OriginalSmartTable.Views.OriginalSmartTableView
                    collection: collection

        App.commands.setHandler "original:smart:table:app", (opts) ->
            new OriginalSmartTable.Controller opts
