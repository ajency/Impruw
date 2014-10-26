define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-slider-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedSlider', (TranslatedSlider, App, Backbone, Marionette, $, _)->

        class TranslatedSlider.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang

                # get page slider collection
                @pageSliderCollection = App.request "get:page:slider:elements" , @pageId , @editLang

                @tanslatedContentView = @_getLanguageView()

                #function to load view
                @show @tanslatedContentView,
                    loading: true

            _getLanguageView :->
                new TranslatedSlider.Views.TranslatedSliderView
                    collection: @pageSliderCollection
                    language: @editLang

        App.commands.setHandler "translated:slider:content:app", (opts) ->
            new TranslatedSlider.Controller opts
