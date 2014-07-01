define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-room-facilities/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedRoomFacilities', (TranslatedRoomFacilities, App, Backbone, Marionette, $, _)->

        class TranslatedRoomFacilities.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts) 

                #get page collection
                @translatedFacilityCollection = translatedFacilityCollection = App.request "get:edited:language:facilities", editLang

                @translatedFacilitiesView = @_getTranslatedFacilitiesView translatedFacilityCollection

                @listenTo @translatedFacilitiesView, "update:translated:facilities", @updateTranslatedFacilities

                #function to load view
                @show @translatedFacilitiesView,
                    loading: true

            _getTranslatedFacilitiesView : (collection)->
                new TranslatedRoomFacilities.Views.TranslatedRoomFacilitiesView
                    collection: collection

            updateTranslatedFacilities: (translatedFacilityTerms)->
                data = {translatedFacilityTerms: translatedFacilityTerms}

                responseFn = (response)=>
                    console.log "Success"

                # update enabled languages
                $.post "#{AJAXURL}?action=update-translated-facilities", data, responseFn, 'json'            

        App.commands.setHandler "translated:room:facilities:app", (opts) ->
            new TranslatedRoomFacilities.Controller opts
