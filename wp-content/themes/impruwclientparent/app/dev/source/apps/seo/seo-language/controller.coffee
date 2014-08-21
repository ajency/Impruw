define ['app', 'controllers/base-controller'
        'apps/seo/seo-language/view'], (App, AppController)->
    App.module 'SeoApp.SeoLanguage', (SeoLanguage, App, Backbone, Marionette, $, _)->

        class SeoLanguage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                #get language collection
                @collection = collection = App.request "get:all:languages"
                console.log @collection

                @languageSelectionView = @_getLanguageView @collection

                @listenTo @languageSelectionView, "load:seo:page:nav", @loadSeoPageNav
                
                #function to load view
                @show @languageSelectionView,
                    loading: true

            _getLanguageView : (collection, model)->
                new SeoLanguage.Views.SeoLanguageView
                    collection: collection

            loadSeoPageNav: (selectedSeoLanguage)->
                Marionette.triggerMethod.call @region, "load:seo:page:nav:bar",selectedSeoLanguage

        App.commands.setHandler "seo:language:selection:app", (opts) ->
            new SeoLanguage.Controller opts
