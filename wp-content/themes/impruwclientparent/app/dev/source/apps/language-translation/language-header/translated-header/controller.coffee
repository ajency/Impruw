define ['app', 'controllers/base-controller'
        'apps/language-translation/language-header/translated-header/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageHeaderContent.TranslatedHeader', (TranslatedHeader, App, Backbone, Marionette, $, _)->

        class TranslatedHeader.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get site model
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                #get page element collection
                @headerElementsCollection = App.request "get:header:elements" 

                @translatedHeaderView = @_getTranslatedHeaderView @headerElementsCollection

                @listenTo @translatedHeaderView, "itemview:header:element:updated", @updateHeaderElementContent

                #function to load view
                @show @translatedHeaderView,
                    loading: true

            _getTranslatedHeaderView :(collection)->
                new TranslatedHeader.Views.TranslatedHeaderView
                    model : @siteModel
                    collection: collection
                    language: @editLang

            updateHeaderElementContent :(view, newElemContent)->

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

        App.commands.setHandler "translated:header:app", (opts) ->
            new TranslatedHeader.Controller opts