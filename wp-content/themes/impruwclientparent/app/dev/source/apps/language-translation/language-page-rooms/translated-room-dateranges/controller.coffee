define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-room-dateranges/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedRoomDateranges', (TranslatedRoomDateranges, App, Backbone, Marionette, $, _)->

        class TranslatedRoomDateranges.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts)

                @editLang = editLang

                #get page collection
                @translatedDaterangeCollection = translatedDaterangeCollection = App.request "get:translated:daterange:collection", editLang
                console.log translatedDaterangeCollection

                @translatedDaterangesView = @_getTranslatedDaterangesView translatedDaterangeCollection

                @listenTo @translatedDaterangesView, "update:translated:dateranges", @updateTranslatedDateranges

                #function to load view
                @show @translatedDaterangesView,
                    loading: true

            _getTranslatedDaterangesView : (collection)->
                new TranslatedRoomDateranges.Views.TranslatedRoomDaterangesView
                    collection: collection

            updateTranslatedDateranges: (translatedDaterange)->
                data =
                  translatedDaterange: translatedDaterange
                  editingLanguage: @editLang

                responseFn = (response)=>
                  @translatedDaterangesView.triggerMethod "daterange:updated" 

                # update enabled languages
                $.post "#{AJAXURL}?action=update-translated-dateranges", data, responseFn, 'json'            

        App.commands.setHandler "translated:room:dateranges:app", (opts) ->
            new TranslatedRoomDateranges.Controller opts
