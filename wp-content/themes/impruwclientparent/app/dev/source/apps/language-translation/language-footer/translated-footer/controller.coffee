define ['app', 'controllers/base-controller'
        'apps/language-translation/language-footer/translated-footer/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageFooterContent.TranslatedFooter', (TranslatedFooter, App, Backbone, Marionette, $, _)->

        class TranslatedFooter.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get site model
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                #get page element collection
                @footerElementsCollection = App.request "get:footer:elements" 

                @translatedFooterView = @_getTranslatedFooterView @footerElementsCollection

                @listenTo @translatedFooterView, "itemview:footer:element:updated", @updateFooterElementContent

                #function to load view
                @show @translatedFooterView,
                    loading: true

            _getTranslatedFooterView :(collection)->
                new TranslatedFooter.Views.TranslatedFooterView
                    model : @siteModel
                    collection: collection
                    language: @editLang

            updateFooterElementContent :(view, newElemContent)->

                model = view.model
                
                if model.get('element') is 'Link'
                    content_text = 'text'
                else
                    content_text = 'content'

                translatedContent = model.get content_text
                editLang = @editLang
                translatedContent[editLang] = newElemContent
                model.set content_text, translatedContent
                model.save null,
                    wait: true
                    success: @contentUpdated

            @contentUpdated :->
                console.log "Successfully updated content"

        App.commands.setHandler "translated:footer:app", (opts) ->
            new TranslatedFooter.Controller opts