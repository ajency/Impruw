define ['app', 'controllers/base-controller'
        'apps/language-translation/language-site-details/original-address-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageSiteContent.OriginalAddress', (OriginalAddress, App, Backbone, Marionette, $, _)->

        class OriginalAddress.Controller extends AppController

            # initiliaze controller
            initialize: (opts)-> 

                #get site collection
                @siteModel = siteModel = App.request "get:site:model"

                @originalAddressView = @_getAddressView siteModel

                #function to load view
                @show @originalAddressView,
                    loading: true

            _getAddressView : (model)->
                new OriginalAddress.Views.OriginalAddressItemView
                    model: model

        App.commands.setHandler "original:address:app", (opts) ->
            new OriginalAddress.Controller opts
