define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-nav/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageNav', (LanguagePageNav, App, Backbone, Marionette, $, _)->
        class LanguagePageNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {language} = opts

                @editingLanguage = language

                #get page collection
                @collection = collection = App.request "get:language:pages", language

                @languagePageNavView = @_getPageNavView @collection

                @listenTo @languagePageNavView, "itemview:page:room:content", @loadLanguagePageRoomContent

                #function to load view
                @show @languagePageNavView,
                    loading: true

            _getPageNavView : (collection)->
                new LanguagePageNav.Views.LanguagePageNavView
                    collection: collection

            loadLanguagePageRoomContent : ->
                Marionette.triggerMethod.call @region, "load:page:room:content", @editingLanguage


        App.commands.setHandler "show:language:page:nav:app", (opts) ->
            new LanguagePageNav.Controller opts

