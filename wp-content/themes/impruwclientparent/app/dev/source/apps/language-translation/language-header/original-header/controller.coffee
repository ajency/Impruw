define ['app', 'controllers/base-controller'
        'apps/language-translation/language-header/original-header/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageHeaderContent.OriginalHeader', (OriginalHeader, App, Backbone, Marionette, $, _)->

        class OriginalHeader.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get page element collection
                @headerElementsCollection = App.request "get:header:elements" 

                @originalHeaderView = @_getHeaderView @headerElementsCollection

                #function to load view
                @show @originalHeaderView,
                    loading: true

            _getHeaderView :(collection)->
                new OriginalHeader.Views.OriginalHeaderView
                    collection: collection

        App.commands.setHandler "original:header:app", (opts) ->
            new OriginalHeader.Controller opts