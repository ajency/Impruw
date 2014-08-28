define ['app', 'controllers/base-controller'
        'apps/language-translation/language-footer/original-footer/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageFooterContent.OriginalFooter', (OriginalFooter, App, Backbone, Marionette, $, _)->

        class OriginalFooter.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get page element collection
                @footerElementsCollection = App.request "get:footer:elements" 

                @originalFooterView = @_getFooterView @footerElementsCollection

                #function to load view
                @show @originalFooterView,
                    loading: true

            _getFooterView :(collection)->
                new OriginalFooter.Views.OriginalFooterView
                    collection: collection

        App.commands.setHandler "original:footer:app", (opts) ->
            new OriginalFooter.Controller opts