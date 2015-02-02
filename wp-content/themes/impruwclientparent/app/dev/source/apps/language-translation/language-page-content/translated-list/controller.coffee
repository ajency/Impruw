define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-list/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedListTable', (TranslatedListTable, App, Backbone, Marionette, $, _)->

        class TranslatedListTable.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang
                @originalId = opts.originalId

                #get page element collection
                @pageListTableCollection = App.request "get:list:table:elements" , @originalId , @editLang

                @translatedContentView = @_getLanguageView @pageListTableCollection

                @listenTo @translatedContentView, "itemview:page:listtable:updated", @updatePageListTable

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(collection)->
                new TranslatedListTable.Views.TranslatedListTablesView
                    collection: collection
                    language : @editLang

            updatePageListTable :(outerview,data)->
                model = outerview.model
                editingLang = @editLang
                listtableData =  data

                # get original smartable content
                contents = model.get 'contents'
               
                unless o.hasOwnProperty(editingLang)
                    contents[editingLang] = new Array()
                
                # modify the smartable content
                _.each listtableData, (value, key) ->
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
                @translatedContentView.triggerMethod 'translate:listtable:updated'

        App.commands.setHandler "translated:list:table:app", (opts) ->
            new TranslatedListTable.Controller opts
