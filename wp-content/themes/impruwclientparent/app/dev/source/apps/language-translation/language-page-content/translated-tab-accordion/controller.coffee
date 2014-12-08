define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-tab-accordion/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedTabAccordion', (TranslatedTabAccordion, App, Backbone, Marionette, $, _)->

        class TranslatedTabAccordion.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang
                @originalId = opts.originalId

                @pageTabsAccordionCollection = App.request "get:tab:accordion:elements" , @pageId , @editLang

                @translatedContentView = @_getLanguageView @pageTabsAccordionCollection

                @listenTo @translatedContentView, "itemview:page:tabaccordion:updated", @updatePageTabAccordion

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(collection)->
                new TranslatedTabAccordion.Views.TranslatedTabAccordionView
                    collection: collection
                    language : @editLang

            updatePageTabAccordion :(outerview)->
                model = outerview.model
                editingLang = @editLang

                # get original smartable content
                contents = model.get 'tabElements'
               
                # unless o.hasOwnProperty(editingLang)
                #     contents[editingLang] = new Array()
                
                # # modify the smartable content
                # _.each smarttableData, (value, key) ->
                #       _.each value, (value, key) ->
                #         contents[editingLang][key] = value


                # _.each contents, (value, key) ->
                #     _.each value, (val1, key1) ->
                #         _.each val1, (val2, key2) ->
                #             contents[key][key1][key2] = _.stripslashes val2


                
                # model.set 'contents' , contents
                # model.set 'source', 'dashboard'
                model.set 'json-page-id', @pageId
                model.set 'edit-lang', @editLang

                model.save null,
                    wait: true
                    success: @contentUpdated

            contentUpdated :=>
                @translatedContentView.triggerMethod 'translate:tab:accordion:updated'

        App.commands.setHandler "translated:tab:accordion:app", (opts) ->
            new TranslatedTabAccordion.Controller opts
