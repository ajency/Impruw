define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-smart-table/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedSmartTable', (TranslatedSmartTable, App, Backbone, Marionette, $, _)->

        class TranslatedSmartTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang
                @originalId = opts.originalId

                #get page element collection
                @pageSmartTableCollection = App.request "get:smart:table:elements" , @originalId , @editLang

                @translatedContentView = @_getLanguageView @pageSmartTableCollection

                @listenTo @translatedContentView, "itemview:page:smarttable:updated", @updatePageSmartTable

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(collection)->
                new TranslatedSmartTable.Views.TranslatedSmartTablesView
                    collection: collection
                    language : @editLang

            updatePageSmartTable :(outerview,data)->
                model = outerview.model
                editingLang = @editLang
                smarttableData =  data

                # get original smartable content
                contents = model.get 'contents'
               
                unless o.hasOwnProperty(editingLang)
                    contents[editingLang] = new Array()
                
                # modify the smartable content
                _.each smarttableData, (value, key) ->
                      _.each value, (value, key) ->
                        contents[editingLang][key] = value


                _.each contents, (value, key) ->
                    _.each value, (val1, key1) ->
                        _.each val1, (val2, key2) ->
                            contents[key][key1][key2] = _.stripslashes val2


                
                model.set 'contents' , contents
                model.set 'source', 'dashboard'
                model.set 'json-page-id', @pageId

                model.save null,
                    wait: true
                    success: @contentUpdated

            contentUpdated :=>
                @translatedContentView.triggerMethod 'translate:smartable:updated'

        App.commands.setHandler "translated:smart:table:app", (opts) ->
            new TranslatedSmartTable.Controller opts
