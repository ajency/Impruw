define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-table-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedTable', (TranslatedTable, App, Backbone, Marionette, $, _)->

        class TranslatedTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang
                @originalId = opts.originalId

                #get page element collection
                @pageTableCollection = App.request "get:page:table:elements" , @originalId , @editLang

                @translatedContentView = @_getLanguageView @pageTableCollection

                @listenTo @translatedContentView, "itemview:page:table:updated", @updatePageTableContent 

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(collection)->
                new TranslatedTable.Views.TranslatedTableView
                    collection: collection
                    language: @editLang

            updatePageTableContent :(view,newElemContent)->
                model = view.model
                translatedContent = model.get 'content'
                editLang = @editLang
                translatedContent = newElemContent
                console.log newElemContent
                model.set 'content', newElemContent
                model.save null,
                    wait: true
                    success: @contentUpdated

            @contentUpdated :->
                console.log "Successfully updated content"

        App.commands.setHandler "translated:table:content:app", (opts) ->
            new TranslatedTable.Controller opts
