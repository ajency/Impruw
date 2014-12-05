define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-tab-accordion/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalTabAccordion', (OriginalTabAccordion, App, Backbone, Marionette, $, _)->

        class OriginalTabAccordion.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                #get page element collection
                @pageTabsAccordionCollection = App.request "get:tab:accordion:elements" , @pageId , @editLang

                console.log @pageTabsAccordionCollection

                @originalContentView = @_getLanguageView @pageTabsAccordionCollection

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :(collection)->
                #TODO pass default language
                new OriginalTabAccordion.Views.OriginalTabAccordionView
                    collection: collection

        App.commands.setHandler "original:tab:accordion:app", (opts) ->
            new OriginalTabAccordion.Controller opts
