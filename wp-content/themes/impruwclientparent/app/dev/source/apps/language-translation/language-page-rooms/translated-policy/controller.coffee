define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-rooms/translated-policy/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageRooms.TranslatedPolicy', (TranslatedPolicy, App, Backbone, Marionette, $, _)->

        class TranslatedPolicy.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {editLang} = (opts)

                @editLang = editLang

                #get site collection
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                @translatedPolicyView = @_getTranslatedPolicyView siteModel

                @listenTo @translatedPolicyView, "update:translated:policy", @updateTranslatedPolicy

                #function to load view
                @show @translatedPolicyView,
                    loading: true

            _getTranslatedPolicyView : (model)->
                new TranslatedPolicy.Views.TranslatedPolicyView
                    model: model

            updateTranslatedPolicy: (translatedSiteprofile)->
                data =
                  translatedSiteprofile: translatedSiteprofile
                  editingLanguage: @editLang

                responseFn = (response)=>
                  @translatedPolicyView.triggerMethod "policy:updated" 

                $.post "#{AJAXURL}?action=update-translated-siteprofile", data, responseFn, 'json'            

        App.commands.setHandler "translated:room:policy:app", (opts) ->
            new TranslatedPolicy.Controller opts
