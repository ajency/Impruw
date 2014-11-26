define ['app', 'controllers/base-controller'
        'apps/language-translation/language-menus/translated-menu/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageMenuContent.TranslatedMenu', (TranslatedMenu, App, Backbone, Marionette, $, _)->

        class TranslatedMenu.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get site model
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                #get page element collection
                @headerElementsCollection = App.request "get:header:elements" 

                @translatedMenuView = @_getTranslatedMenuView @headerElementsCollection

                @listenTo @translatedMenuView, "itemview:header:element:updated", @updateMenuElementContent

                #function to load view
                @show @translatedMenuView,
                    loading: true

            _getTranslatedMenuView :(collection)->
                new TranslatedMenu.Views.TranslatedMenuView
                    model : @siteModel
                    collection: collection
                    language: @editLang

            updateMenuElementContent :(view, newElemContent)->

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

            contentUpdated :->
                console.log "Successfully updated content"

        App.commands.setHandler "translated:menu:app", (opts) ->
            new TranslatedMenu.Controller opts