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

                @translatedContentView = @_getLanguageView()

                @listenTo @translatedContentView, "itemview:itemview:page:slide:updated", @updatePageSlideContent

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :->
                new TranslatedSlider.Views.TranslatedSliderView
                    collection: @pageSliderCollection
                    language: @editLang

            updatePageSlideContent :(outerview,innerview, newCaptionTitle,newCaptionDesc,slideParentId,sliderId)->

                model = innerview.model
                
                data =
                    newCaptionTitle: newCaptionTitle
                    newCaptionDesc: newCaptionDesc
                    language: @editLang
                    slideParentId: slideParentId
                    sliderId: sliderId

                responseFn = (response)=>
                    console.log "Success"

                $.post "#{AJAXURL}?action=update-translated-page-slide", data, responseFn, 'json'

        App.commands.setHandler "translated:slider:content:app", (opts) ->
            new TranslatedSlider.Controller opts
