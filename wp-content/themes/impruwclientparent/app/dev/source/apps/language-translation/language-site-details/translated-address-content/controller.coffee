define ['app', 'controllers/base-controller'
        'apps/language-translation/language-site-details/translated-address-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageSiteContent.TranslatedAddress', (TranslatedAddress, App, Backbone, Marionette, $, _)->

        class TranslatedAddress.Controller extends AppController

            # initiliaze controller
            initialize: (opts)-> 
                @editLang = opts.editLang

                #get site collection
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                @translatedAddressView = @_getTranslatedAddressView siteModel
                @listenTo @translatedAddressView, "update:translated:siteprofile", @updateTranslatedSiteprofile
                

                #function to load view
                @show @translatedAddressView,
                    loading: true

            _getTranslatedAddressView : (model)->
                new TranslatedAddress.Views.TranslatedAddressItemView
                    model: model
                    language: @editLang

            updateTranslatedSiteprofile: (translatedSiteprofile)->
                data =
                  translatedSiteprofile: translatedSiteprofile
                  editingLanguage: @editLang

                responseFn = (response)=>
                  @translatedAddressView.triggerMethod "siteprofile:updated" 

                # update enabled languages
                $.post "#{AJAXURL}?action=update-translated-siteprofile", data, responseFn, 'json'

        App.commands.setHandler "translated:address:app", (opts) ->
            new TranslatedAddress.Controller opts
