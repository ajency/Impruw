define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/original-slider-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.OriginalSlider', (OriginalSlider, App, Backbone, Marionette, $, _)->

        class OriginalSlider.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                # get page slider collection
                @pageSliderCollection = App.request "get:page:slider:elements" , @pageId , @editLang

                @originalContentView = @_getLanguageView()

                #function to load view
                @show @originalContentView,
                    loading: true

            _getLanguageView :->
                new OriginalSlider.Views.OriginalSliderView
                    collection: @pageSliderCollection

        App.commands.setHandler "original:slider:content:app", (opts) ->
            new OriginalSlider.Controller opts
